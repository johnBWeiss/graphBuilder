export type GraphEntity = {
  id: EntityID;
  label: string;
  category: EntityCategory;
};

export interface GraphEdge {
  source: EntityID;
  target: EntityID;
}

export interface PathNodeType {
  id: string;
  selectedFieldsByCategory: Record<EntityCategory, EntityID[]> | undefined;
}

export type FlowPathState = PathNodeType[];

export interface IGraphDataModel {
  setEntitiesAndEdgesWithIndexes(
    newEntities: GraphEntity[],
    newEdges: GraphEdge[],
  ): void;

  addNode(
    edgeNodeIndex: number,
    _selectedFieldIds: string[],
    oldFlow: FlowPathState,
  ): FlowPathState;

  editNode(newNode: PathNodeType, oldFlow: FlowPathState): FlowPathState;

  deleteNode(nodeIdToDelete: string, oldFlow: FlowPathState): FlowPathState;

  buildSelectedEntitiesSet(flowState: FlowPathState): Set<EntityID>;

  getEntityById(id: EntityID | undefined): GraphEntity | undefined;

  getCategoryKeys(): EntityCategory[];

  getRawEntitiesByCategory(category: EntityCategory | undefined): GraphEntity[];

  getLegalUnusedCategoriesForNewNode(
    flowState: FlowPathState,
    nodeIndex: number,
    selectedEntitiesSet: Set<EntityID>,
  ): EntityCategory[];

  getLegalEntityOptionsByCategory(
    precedingFieldId: EntityID,
    selectedCategory: EntityCategory,
    flowState: FlowPathState | null | undefined,
    nodeIndex: number,
    selectedEntitiesSet: Set<EntityID>,
    getEntityLabelCallback: (id: EntityID | undefined) => string,
  ): GraphEntity[];

  hasLegalUnusedNextEdges(
    sourceId: EntityID,
    flowState: FlowPathState | null | undefined,
    nodeIndex: number,
    selectedEntitiesSet: Set<EntityID>,
  ): boolean;
}
export enum EntityCategory {
  BILLING = "billing",
  ERP = "erp",
  PAYMENTS = "payments",
  CRM = "crm",
  TAX = "tax",
}

export enum EntityID {
  // Billing Entities
  BILLING_ACCOUNT = "billing_account",
  BILLING_CREDIT_MEMO = "billing_credit_memo",
  BILLING_INVOICE = "billing_invoice",
  BILLING_PAYMENT = "billing_payment",
  BILLING_REFUND = "billing_refund",
  BILLING_SUBSCRIPTION = "billing_subscription",
  BILLING_USAGE = "billing_usage",

  // ERP Entities
  ERP_ACCOUNT = "erp_account",
  ERP_ACCOUNTING_BOOK = "erp_accounting_book",
  ERP_BILL = "erp_bill",
  ERP_BILL_CREDIT = "erp_bill_credit",
  ERP_BILL_CREDIT_ITEM = "erp_bill_credit_item",
  ERP_BILL_PAYMENT_ITEMS = "erp_bill_payment_items",
  ERP_BILLING_SCHEDULE = "erp_billing_schedule",
  ERP_CHECK = "erp_check",
  ERP_CHEQUE = "erp_cheque",
  ERP_CREDIT_MEMO = "erp_credit_memo",
  ERP_CREDIT_MEMO_ITEMS = "erp_credit_memo_items",
  ERP_CUSTOMER = "erp_customer",
  ERP_DEPARTMENT = "erp_department",
  ERP_DEPOSIT = "erp_deposit",
  ERP_EMPLOYEE = "erp_employee",
  ERP_ENTRIES = "erp_entries",
  ERP_EXPENSE_REPORT = "erp_expense_report",
  ERP_EXPENSE_REPORT_ITEMS = "erp_expense_report_items",
  ERP_INVOICE = "erp_invoice",
  ERP_INVOICE_ITEMS = "erp_invoice_items",
  ERP_INVOICE_SHIPPING_ADDRESS = "erp_invoice_shipping_address",
  ERP_ITEM_RECEIPT = "erp_item_receipt",
  ERP_JOURNAL = "erp_journal",
  ERP_JOURNAL_ITEMS = "erp_journal_items",
  ERP_PAYMENT = "erp_payment",
  ERP_PAYMENT_ITEMS = "erp_payment_items",
  ERP_PRODUCT = "erp_product",
  ERP_PURCHASE_ORDER = "erp_purchase_order",
  ERP_PURCHASE = "erp_purchase",
  ERP_REFUND = "erp_refund",
  ERP_REFUND_ITEMS = "erp_refund_items",
  ERP_SALES_ORDER = "erp_sales_order",
  ERP_SALES_ORDER_ITEMS = "erp_sales_order_items",
  ERP_TRANSFER = "erp_transfer",
  ERP_VENDOR = "erp_vendor",

  // Payments Entities
  PAYMENTS_CUSTOMER = "payments_customer",
  PAYMENTS_PAYMENT = "payments_payment",
  PAYMENTS_PAYOUT = "payments_payout",
  PAYMENTS_REFUND = "payments_refund",
  PAYMENTS_TRANSFER = "payments_transfer",

  // CRM Entities
  CRM_ACCOUNT = "crm_account",
  CRM_ASSET = "crm_asset",
  CRM_ATTACHMENT = "crm_attachment",
  CRM_CONTRACT = "crm_contract",
  CRM_INSTALLMENT = "crm_installment",
  CRM_INVOICE = "crm_invoice",
  CRM_OPPORTUNITY = "crm_opportunity",
  CRM_OPPORTUNITY_DOC = "crm_opportunity_doc",
  CRM_OPPORTUNITY_ITEMS = "crm_opportunity_items",
  CRM_MT_DOC = "crm_mt_doc",
  CRM_MT_DOC_ITEMS = "crm_mt_doc_items",
  CRM_OF_DOC = "crm_of_doc",
  CRM_OF_DOC_ITEMS = "crm_of_doc_items",
  CRM_PO_DOC = "crm_po_doc",
  CRM_PO_DOC_ITEMS = "crm_po_doc_items",
  CRM_SA_DOC = "crm_sa_doc",
  CRM_TC_DOC = "crm_tc_doc",
  CRM_PRICEBOOK = "crm_pricebook",
  CRM_PRICEBOOK_ENTRY = "crm_pricebook_entry",
  CRM_PRODUCT = "crm_product",
  CRM_QUOTE = "crm_quote",

  // Tax Entities
  TAX_CUSTOMER = "tax_customer",
  TAX_INVOICE = "tax_invoice",
  TAX_INVOICE_ITEMS = "tax_invoice_items",
}
