import { Request, Response } from "express";
import AppDataSource from "../config/dataSource";
import Leads from "../entities/Leads";
import { saveLeadFiles } from "../config/leadsConfig";
import { ILike } from "typeorm";
import { SubCategory } from "../entities/subCategory";


const leadRepository = AppDataSource.getRepository(Leads);

// Leads only store a subcategory_id FK. Category info is derived through
// SubCategory -> Category and flattened onto the response here.
const SUBCATEGORY_RELATIONS = { subCategory: { category: true } };

const formatLeadResponse = (lead: Leads) => {
  const { subCategory, ...rest } = lead as any;

  return {
    ...rest,
    subCategoryId: subCategory?.id ?? null,
    subCategoryName: subCategory?.name ?? null,
    categoryId: subCategory?.category?.id ?? null,
    categoryName: subCategory?.category?.name ?? null,
  };
};

const formatLeadsResponse = (leads: Leads[]) => leads.map(formatLeadResponse);

const normalizeLeadUpdatePayload = (body: Record<string, any> = {}) => {
  const normalized: Record<string, any> = {};
  const aliases: Record<string, string> = {
    first_name: "firstName",
    last_name: "lastName",
    country_code: "countryCode",
    phone_number: "phoneNumber",
    budget_range: "budgetRange",
    configuration_type: "configurationType",
    property_type: "propertyType",
    pan_card: "panCard",
    aadhar_card: "aadharCard",
    driving_license: "drivingLicense",
    is_active: "isActive",
  };

  Object.entries(body).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    const normalizedKey = aliases[key] ?? key;
    normalized[normalizedKey] = typeof value === "string" ? value.trim() : value;
  });

  if (typeof normalized.email === "string") {
    normalized.email = normalized.email.trim().toLowerCase();
  }

  return normalized;
};

export const createLead = async (req: Request, res: Response) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] } | undefined;
    const email = (req.body.email || "").toString().trim().toLowerCase();

    // Buffers are only written to disk here, after validateLead + checkLeadExists have passed.
    const folderKey = email || "lead";
    const documentPaths = saveLeadFiles(files, folderKey);
 // const budget = req.body.budgetRange + "00000";

    const lead = leadRepository.create({
      ...req.body,
      ...documentPaths,
     // budgetRange:budget
    });

    const savedLead = await leadRepository.save(lead);

    res.status(201).json({
      success: true,
      data: savedLead,
    });
  } catch (error: any) {
    if (error.code === "23505") {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }
    console.error("Create Lead Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create lead",
    });
  }
};





export const getAllLeads = async (req: Request, res: Response) => {
  try {
    const leads = await leadRepository.find({
      relations: SUBCATEGORY_RELATIONS,
      order: {
        id: "DESC",
      },
    });

    return res.status(200).json({
      success: true,
      count: leads.length,
      data: formatLeadsResponse(leads),
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
    });
  }
};



export const getLeadById = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;

    const lead = await leadRepository.findOne({
      where: { email },
      relations: SUBCATEGORY_RELATIONS,
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: formatLeadResponse(lead),
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
    });
  }
};







export const updateLeadByEmail = async (req: Request, res: Response) => {
  try {
    const updatePayload = normalizeLeadUpdatePayload(req.body as Record<string, any>);
    const email = updatePayload.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const lead = await leadRepository.findOne({
      where: { email },
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    const { email: _email, ...leadData } = updatePayload;

    leadRepository.merge(lead, leadData);

    const folderKey = (leadData.email ?? lead.email ?? "lead").toString().trim().toLowerCase() || "lead";

    const documentPaths = saveLeadFiles(
      req.files as { [fieldname: string]: Express.Multer.File[] } | undefined,
      folderKey
    );

    if (Object.keys(documentPaths).length > 0) {
      leadRepository.merge(lead, documentPaths);
    }

    const updatedLead = await leadRepository.save(lead);

    return res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    console.error("Update Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update lead",
    });
  }
};

export const deleteLeadByEmail = async (req: Request, res: Response) => {
  try {
    const email = req.body.email;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const lead = await leadRepository.findOne({
      where: { email },
    });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    await leadRepository.remove(lead);

    return res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    console.error("Delete Lead Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete lead",
    });
  }
};






// Get Leads by Project
export const getLeadsByProject = async (req: Request, res: Response) => {
  try {
    const project = req.body.project;

    const leads = await leadRepository.find({
      where: { project: ILike(project) },
      relations: SUBCATEGORY_RELATIONS,
    });

    if (leads.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No leads found for project '${project}'.`,
      });
    }

    console.log(`Fetched ${leads.length} leads for project '${project}'.`);

    return res.status(200).json({ success: true, count: leads.length, data: formatLeadsResponse(leads) });
  } catch (error) {
    console.error("Error fetching leads by project:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch leads by project" });
  }
};

// Get Leads by Location
export const getLeadsByLocation = async (req: Request, res: Response) => {
  try {
    const location = req.body.location;

    const leads = await leadRepository.find({
      where: { location: ILike(location) },
      relations: SUBCATEGORY_RELATIONS,
    });

    if (leads.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No leads found for location '${location}'.`,
      });
    }

    console.log(`Fetched ${leads.length} leads for location '${location}'.`);

    return res.status(200).json({ success: true, count: leads.length, data: formatLeadsResponse(leads) });
  } catch (error) {
    console.error("Error fetching leads by location:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch leads by location" });
  }
};

// Get Leads by Configuration Type
export const getLeadsByConfiguration = async (req: Request, res: Response) => {
  try {
    const configurationType = req.body.configurationType;

    const leads = await leadRepository.find({
      where: { configurationType: ILike(configurationType) },
      relations: SUBCATEGORY_RELATIONS,
    });

    if (leads.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No leads found with configuration type '${configurationType}'.`,
      });
    }

    console.log(`Fetched ${leads.length} leads with configuration type '${configurationType}'.`);

    return res.status(200).json({ success: true, count: leads.length, data: formatLeadsResponse(leads) });
  } catch (error) {
    console.error("Error fetching leads by configuration type:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch leads by configuration type" });
  }
};

// Get Leads by Property Type
export const getLeadsByPropertyType = async (req: Request, res: Response) => {
  try {
    const propertyType = req.body.propertyType;

    const leads = await leadRepository.find({
      where: { propertyType: ILike(propertyType) },
      relations: SUBCATEGORY_RELATIONS,
    });

    if (leads.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No leads found with property type '${propertyType}'.`,
      });
    }

    console.log(`Fetched ${leads.length} leads with property type '${propertyType}'.`);

    return res.status(200).json({ success: true, count: leads.length, data: formatLeadsResponse(leads) });
  } catch (error) {
    console.error("Error fetching leads by property type:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch leads by property type" });
  }
};






//


//======================================searchLeads===========================================
// Dynamic search: any combination of name, email, phoneNumber, project,
// location, configurationType, propertyType.
// Only filters that are actually provided get added to the query.
// Fixed page size of 20 results per page.
const LEADS_PAGE_SIZE = 20;

export const searchLeads = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      project,
      location,
      configurationType,
      propertyType,
      page = 1,
    } = req.body;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);

    const query = leadRepository
      .createQueryBuilder("lead")
      .leftJoinAndSelect("lead.subCategory", "subCategory")
      .leftJoinAndSelect("subCategory.category", "category");

    if (name && name.toString().trim()) {
      const term = `%${name.toString().trim()}%`;
      query.andWhere(
        "(lead.firstName ILIKE :name OR lead.lastName ILIKE :name OR CONCAT(lead.firstName, ' ', lead.lastName) ILIKE :name)",
        { name: term }
      );
    }

    if (email && email.toString().trim()) {
      query.andWhere("lead.email ILIKE :email", {
        email: `%${email.toString().trim()}%`,
      });
    }

    if (phoneNumber && phoneNumber.toString().trim()) {
      query.andWhere("lead.phoneNumber ILIKE :phoneNumber", {
        phoneNumber: `%${phoneNumber.toString().trim()}%`,
      });
    }

    if (project && project.toString().trim()) {
      query.andWhere("lead.project ILIKE :project", {
        project: `%${project.toString().trim()}%`,
      });
    }

    if (location && location.toString().trim()) {
      query.andWhere("lead.location ILIKE :location", {
        location: `%${location.toString().trim()}%`,
      });
    }

    if (configurationType && configurationType.toString().trim()) {
      query.andWhere("lead.configurationType ILIKE :configurationType", {
        configurationType: `%${configurationType.toString().trim()}%`,
      });
    }

    if (propertyType && propertyType.toString().trim()) {
      query.andWhere("lead.propertyType ILIKE :propertyType", {
        propertyType: `%${propertyType.toString().trim()}%`,
      });
    }

    const noFiltersProvided =
      !name && !email && !phoneNumber && !project && !location && !configurationType && !propertyType;

    if (noFiltersProvided) {
      return res.status(400).json({
        success: false,
        message:
          "Provide at least one of name, email, phoneNumber, project, location, configurationType, or propertyType to search",
      });
    }

    query
      .orderBy("lead.createdAt", "DESC")
      .skip((pageNum - 1) * LEADS_PAGE_SIZE)
      .take(LEADS_PAGE_SIZE);

    const [leads, total] = await query.getManyAndCount();

    if (leads.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leads found matching the search criteria",
      });
    }

    return res.status(200).json({
      success: true,
      count: leads.length,
      total,
      page: pageNum,
      limit: LEADS_PAGE_SIZE,
      totalPages: Math.ceil(total / LEADS_PAGE_SIZE),
      data: formatLeadsResponse(leads),
    });
  } catch (error) {
    console.error("Error searching leads:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to search leads",
    });
  }
};

//======================================updateLeadCategory===========================================



//======================================updateLeadCategory===========================================

export const updateLeadCategory = async (req: Request, res: Response) => {

    const { leadId, subCategoryId } = req.body;

    const leadRepo = AppDataSource.getRepository(Leads);

    const subRepo = AppDataSource.getRepository(SubCategory);

    const lead = await leadRepo.findOne({
        where: { id: leadId }
    });

    if (!lead) {

        return res.status(404).json({
            message: "Lead not found"
        });

    }

    // Category is derived through SubCategory -> Category; only the
    // subcategory_id FK is stored on the lead.
    const subCategory = await subRepo.findOne({
        where: { id: subCategoryId },
        relations: { category: true }
    });

    if (!subCategory) {

        return res.status(404).json({
            message: "SubCategory not found"
        });

    }

    lead.subCategory = subCategory;

    await leadRepo.save(lead);

    return res.json({
        success: true,
        message: "Lead updated successfully",
        data: formatLeadResponse(lead)
    });

};