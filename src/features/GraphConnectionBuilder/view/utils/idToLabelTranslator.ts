import { EntityCategory, EntityID } from "../../model/types";

const capitalizeFirstLetter = (string: string): string => {
  if (!string) return "";
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const SYSTEM_ENTITY_LABELS: Readonly<Record<EntityID, string>> = {
  // Billing
  [EntityID.BILLING_ACCOUNT]: "Account",
  [EntityID.BILLING_CREDIT_MEMO]: "Credit Memo",
  [EntityID.BILLING_INVOICE]: "Invoice",
  [EntityID.BILLING_PAYMENT]: "Payment",
  [EntityID.BILLING_REFUND]: "Refund",
  [EntityID.BILLING_SUBSCRIPTION]: "Subscription",
  [EntityID.BILLING_USAGE]: "Usage",

  // ERP
  [EntityID.ERP_ACCOUNT]: "Account",
  [EntityID.ERP_ACCOUNTING_BOOK]: "Accounting Book",
  [EntityID.ERP_BILL]: "Bill",
  [EntityID.ERP_BILL_CREDIT]: "Bill Credit",
  [EntityID.ERP_BILL_CREDIT_ITEM]: "Bill Credit Item",
  [EntityID.ERP_BILL_PAYMENT_ITEMS]: "Bill Payment Items",
  [EntityID.ERP_BILLING_SCHEDULE]: "Billing Schedule",
  [EntityID.ERP_CHECK]: "Check",
  [EntityID.ERP_CHEQUE]: "Cheque",
  [EntityID.ERP_CREDIT_MEMO]: "Credit Memo",
  [EntityID.ERP_CREDIT_MEMO_ITEMS]: "Credit Memo Items",
  [EntityID.ERP_CUSTOMER]: "Customer",
  [EntityID.ERP_DEPARTMENT]: "Department",
  [EntityID.ERP_DEPOSIT]: "Deposit",
  [EntityID.ERP_EMPLOYEE]: "Employee",
  [EntityID.ERP_ENTRIES]: "Entries",
  [EntityID.ERP_EXPENSE_REPORT]: "Expense Report",
  [EntityID.ERP_EXPENSE_REPORT_ITEMS]: "Expense Report Items",
  [EntityID.ERP_INVOICE]: "Invoice",
  [EntityID.ERP_INVOICE_ITEMS]: "Invoice Items",
  [EntityID.ERP_INVOICE_SHIPPING_ADDRESS]: "Invoice Shipping Address",
  [EntityID.ERP_ITEM_RECEIPT]: "Item Receipt",
  [EntityID.ERP_JOURNAL]: "Journal",
  [EntityID.ERP_JOURNAL_ITEMS]: "Journal Items",
  [EntityID.ERP_PAYMENT]: "Payment",
  [EntityID.ERP_PAYMENT_ITEMS]: "Payment Items",
  [EntityID.ERP_PRODUCT]: "Product",
  [EntityID.ERP_PURCHASE_ORDER]: "Purchase Order",
  [EntityID.ERP_PURCHASE]: "Purchase",
  [EntityID.ERP_REFUND]: "Refund",
  [EntityID.ERP_REFUND_ITEMS]: "Refund Items",
  [EntityID.ERP_SALES_ORDER]: "Sales Order",
  [EntityID.ERP_SALES_ORDER_ITEMS]: "Sales Order Items",
  [EntityID.ERP_TRANSFER]: "Transfer",
  [EntityID.ERP_VENDOR]: "Vendor",

  // Payments
  [EntityID.PAYMENTS_CUSTOMER]: "Customer",
  [EntityID.PAYMENTS_PAYMENT]: "Payment",
  [EntityID.PAYMENTS_PAYOUT]: "Payout",
  [EntityID.PAYMENTS_REFUND]: "Refund",
  [EntityID.PAYMENTS_TRANSFER]: "Transfer",

  // CRM
  [EntityID.CRM_ACCOUNT]: "Account",
  [EntityID.CRM_ASSET]: "Asset",
  [EntityID.CRM_ATTACHMENT]: "Attachment",
  [EntityID.CRM_CONTRACT]: "Contract",
  [EntityID.CRM_INSTALLMENT]: "Installment",
  [EntityID.CRM_INVOICE]: "Invoice",
  [EntityID.CRM_OPPORTUNITY]: "Opportunity",
  [EntityID.CRM_OPPORTUNITY_DOC]: "Opportunity Doc",
  [EntityID.CRM_OPPORTUNITY_ITEMS]: "Opportunity Items",
  [EntityID.CRM_MT_DOC]: "MT Doc",
  [EntityID.CRM_MT_DOC_ITEMS]: "MT Doc Items",
  [EntityID.CRM_OF_DOC]: "OF Doc",
  [EntityID.CRM_OF_DOC_ITEMS]: "OF Doc Items",
  [EntityID.CRM_PO_DOC]: "PO Doc",
  [EntityID.CRM_PO_DOC_ITEMS]: "PO Doc Items",
  [EntityID.CRM_SA_DOC]: "SA Doc",
  [EntityID.CRM_TC_DOC]: "TC Doc",
  [EntityID.CRM_PRICEBOOK]: "Pricebook",
  [EntityID.CRM_PRICEBOOK_ENTRY]: "Pricebook Entry",
  [EntityID.CRM_PRODUCT]: "Product",
  [EntityID.CRM_QUOTE]: "Quote",

  // Tax
  [EntityID.TAX_CUSTOMER]: "Customer",
  [EntityID.TAX_INVOICE]: "Invoice",
  [EntityID.TAX_INVOICE_ITEMS]: "Invoice Items",
};

export const SYSTEM_CATEGORY_LABELS: Readonly<Record<EntityCategory, string>> =
  {
    [EntityCategory.BILLING]: "Billing",
    [EntityCategory.ERP]: "ERP",
    [EntityCategory.PAYMENTS]: "Payments",
    [EntityCategory.CRM]: "CRM",
    [EntityCategory.TAX]: "Tax",
  };

export const getCategoryLabel = (category: EntityCategory): string => {
  return SYSTEM_CATEGORY_LABELS[category] || category;
};

export const getEntityLabel = (id: EntityID | undefined): string => {
  if (!id) return "";
  return SYSTEM_ENTITY_LABELS[id] || id;
};
