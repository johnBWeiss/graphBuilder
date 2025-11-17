import { GraphEdge } from "../../features/GraphConnectionBuilder/model/types";

export const GRAPH_EDGES: { edges: GraphEdge[] } = {
  edges: [
    {
      // @ts-ignore
      source: "billing_account",
      // @ts-ignore
      target: "billing_usage",
    },

    {
      // @ts-ignore
      source: "billing_credit_memo",
      // @ts-ignore
      target: "billing_account",
    },

    {
      // @ts-ignore
      source: "billing_credit_memo",
      // @ts-ignore
      target: "erp_credit_memo",
    },

    {
      // @ts-ignore
      source: "billing_invoice",
      // @ts-ignore
      target: "billing_account",
    },

    {
      // @ts-ignore
      source: "billing_invoice",
      // @ts-ignore
      target: "erp_invoice",
    },

    {
      // @ts-ignore
      source: "billing_payment",
      // @ts-ignore
      target: "billing_account",
    },

    {
      // @ts-ignore
      source: "billing_payment",
      // @ts-ignore
      target: "billing_invoice",
    },

    {
      // @ts-ignore
      source: "billing_payment",
      // @ts-ignore
      target: "erp_payment",
    },

    {
      // @ts-ignore
      source: "billing_payment",
      // @ts-ignore
      target: "payments_payment",
    },

    {
      // @ts-ignore
      source: "billing_refund",
      // @ts-ignore
      target: "billing_account",
    },

    {
      // @ts-ignore
      source: "billing_refund",
      // @ts-ignore
      target: "billing_payment",
    },

    {
      // @ts-ignore
      source: "billing_refund",
      // @ts-ignore
      target: "erp_refund",
    },

    {
      // @ts-ignore
      source: "billing_refund",
      // @ts-ignore
      target: "payments_refund",
    },

    {
      // @ts-ignore
      source: "billing_subscription",
      // @ts-ignore
      target: "billing_account",
    },

    {
      // @ts-ignore
      source: "billing_subscription",
      // @ts-ignore
      target: "billing_invoice",
    },

    {
      // @ts-ignore
      source: "erp_bill",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_bill",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_bill",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_bill",
      // @ts-ignore
      target: "erp_purchase_order",
    },

    {
      // @ts-ignore
      source: "erp_bill",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_bill_credit",
      // @ts-ignore
      target: "erp_bill",
    },

    {
      // @ts-ignore
      source: "erp_bill_credit",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_bill_credit",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_bill_credit",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_bill_credit",
      // @ts-ignore
      target: "erp_journal",
    },

    {
      // @ts-ignore
      source: "erp_bill_credit",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_bill_payment_items",
      // @ts-ignore
      target: "erp_bill",
    },

    {
      // @ts-ignore
      source: "erp_check",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_check",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_check",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_check",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_cheque",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_cheque",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_cheque",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_cheque",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_credit_memo",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_credit_memo",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_credit_memo",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_credit_memo",
      // @ts-ignore
      target: "erp_invoice",
    },

    {
      // @ts-ignore
      source: "erp_credit_memo",
      // @ts-ignore
      target: "erp_journal",
    },

    {
      // @ts-ignore
      source: "erp_credit_memo",
      // @ts-ignore
      target: "erp_refund",
    },

    {
      // @ts-ignore
      source: "erp_credit_memo",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_customer",
      // @ts-ignore
      target: "erp_account",
    },

    {
      // @ts-ignore
      source: "erp_deposit",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_deposit",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_deposit",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_deposit",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_entries",
      // @ts-ignore
      target: "erp_account",
    },

    {
      // @ts-ignore
      source: "erp_entries",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_entries",
      // @ts-ignore
      target: "erp_department",
    },

    {
      // @ts-ignore
      source: "erp_entries",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_entries",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_expense_report",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_expense_report",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_expense_report",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_expense_report",
      // @ts-ignore
      target: "erp_expense_report_items",
    },

    {
      // @ts-ignore
      source: "erp_expense_report",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_invoice",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_invoice",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_invoice",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_invoice",
      // @ts-ignore
      target: "erp_invoice_items",
    },

    {
      // @ts-ignore
      source: "erp_invoice",
      // @ts-ignore
      target: "erp_invoice_shipping_address",
    },

    {
      // @ts-ignore
      source: "erp_invoice",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_journal",
      // @ts-ignore
      target: "erp_bill",
    },

    {
      // @ts-ignore
      source: "erp_journal",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_journal",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_journal",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_journal",
      // @ts-ignore
      target: "erp_invoice",
    },

    {
      // @ts-ignore
      source: "erp_journal",
      // @ts-ignore
      target: "erp_refund",
    },

    {
      // @ts-ignore
      source: "erp_journal",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_payment",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_payment",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_payment",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_payment",
      // @ts-ignore
      target: "erp_invoice",
    },

    {
      // @ts-ignore
      source: "erp_payment",
      // @ts-ignore
      target: "erp_journal",
    },

    {
      // @ts-ignore
      source: "erp_payment",
      // @ts-ignore
      target: "erp_payment_items",
    },

    {
      // @ts-ignore
      source: "erp_payment",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_payment_items",
      // @ts-ignore
      target: "erp_invoice",
    },

    {
      // @ts-ignore
      source: "erp_payment_items",
      // @ts-ignore
      target: "erp_journal",
    },

    {
      // @ts-ignore
      source: "erp_payment_items",
      // @ts-ignore
      target: "erp_refund",
    },

    {
      // @ts-ignore
      source: "erp_purchase_order",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_purchase_order",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_purchase_order",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_purchase_order",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "erp_refund",
      // @ts-ignore
      target: "erp_customer",
    },

    {
      // @ts-ignore
      source: "erp_refund",
      // @ts-ignore
      target: "erp_employee",
    },

    {
      // @ts-ignore
      source: "erp_refund",
      // @ts-ignore
      target: "erp_entries",
    },

    {
      // @ts-ignore
      source: "erp_refund",
      // @ts-ignore
      target: "erp_payment",
    },

    {
      // @ts-ignore
      source: "erp_refund",
      // @ts-ignore
      target: "erp_vendor",
    },

    {
      // @ts-ignore
      source: "payments_payment",
      // @ts-ignore
      target: "erp_payment",
    },

    {
      // @ts-ignore
      source: "payments_payment",
      // @ts-ignore
      target: "payments_customer",
    },

    {
      // @ts-ignore
      source: "payments_payment",
      // @ts-ignore
      target: "payments_payout",
    },

    {
      // @ts-ignore
      source: "payments_payment",
      // @ts-ignore
      target: "payments_transfer",
    },

    {
      // @ts-ignore
      source: "payments_payout",
      // @ts-ignore
      target: "erp_deposit",
    },

    {
      // @ts-ignore
      source: "payments_refund",
      // @ts-ignore
      target: "erp_refund",
    },

    {
      // @ts-ignore
      source: "payments_refund",
      // @ts-ignore
      target: "payments_customer",
    },

    {
      // @ts-ignore
      source: "payments_refund",
      // @ts-ignore
      target: "payments_payout",
    },

    {
      // @ts-ignore
      source: "payments_refund",
      // @ts-ignore
      target: "payments_transfer",
    },
  ],
};
