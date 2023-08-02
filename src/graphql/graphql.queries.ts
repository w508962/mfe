export { GET_PAYMENTS ,
	GET_SUPPLIERS_BY_ORG};

const GET_PAYMENTS = `query payments($id: Int!) {
    payments(organizationId: $id) {
      data {
        uniqueId
        lastActivityDate
        supplier
        paymentMethod
        paymentAmount
        transactionAmount
        paymentStatus
      }
    }
  }`;

const GET_SUPPLIERS_BY_ORG = `query getSuppliers($organizationId: Int!) {
    suppliers(organizationId: $organizationId) {
      data {
        supplierId
        supplierName
        }
    }
  }`;