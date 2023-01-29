export const travelersInfo = [
  {
    attrName: '出行人姓名',
    attrCode: 'travelersName',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '出行人性别',
    attrCode: 'travelersGender',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '出行人联系电话',
    attrCode: 'travelersPhone',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '出行人生日',
    attrCode: 'travelersBirthday',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '出行人国籍',
    attrCode: 'travelersNationality',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '出行人血型',
    attrCode: 'travelersBloodType',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '出行人过敏史',
    attrCode: 'travelersAllergies',
    prodAttrId: null,
    value: false,
    isRequired: false
  }
]

export const travelersCertificate = [
  {
    attrName: '身份证',
    attrCode: 'idCard',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '护照',
    attrCode: 'passport',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '台湾通行证',
    attrCode: 'HKAndMacaoPass',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '回乡证',
    attrCode: 'gohomeCertificate',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '台胞证',
    attrCode: 'taiwanCellCard',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '军官证',
    attrCode: 'officersCertificate',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '士兵证',
    attrCode: 'soldierCertificate',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '证件有效期',
    attrCode: 'validityCertificate',
    prodAttrId: null,
    value: false,
    isRequired: false
  }
]

export const guargianInfo = [
  {
    attrName: '监护人',
    attrCode: 'guargian',
    prodAttrId: null,
    value: false,
    isRequired: false
  },
  {
    attrName: '监护人与出行人关系',
    attrCode: 'relationship',
    prodAttrId: null,
    value: false,
    isRequired: false
  }
]

export const provideInvoice = {
  attrName: '商品可提供发票',
  attrCode: 'provideInvoice',
  prodAttrId: null,
  value: false
}

export function resetOrderSubmit() {
  for (let key in guargianInfo) {
    guargianInfo[key].value = false
    guargianInfo[key].isRequired = false
  }
  for (let key in travelersCertificate) {
    travelersCertificate[key].value = false
    travelersCertificate[key].isRequired = false
  }
  for (let key in travelersInfo) {
    travelersInfo[key].value = false
    travelersInfo[key].isRequired = false
  }
}
