import { BASIS_OF_EVALUATION } from '@/utils/dict-enum'
// 处理新增时，指标的数据
export function handAddTpl(evaluateTplItem) {
  let list = []
  evaluateTplItem.forEach((item, index) => {
    const {
      tplItemBasis,
      tplItemBasisNote,
      tplItemDirectory,
      tplItemName,
      tplItemNote,
      tplItemType,
      gradingItemValue,
      evaluateTplItemValue,
      directItemValue
    } = item
    let evaluateTplItemValueDtos = []
    let _tplItemType = Number(tplItemType)
    if (_tplItemType === BASIS_OF_EVALUATION.DIRECT) {
      evaluateTplItemValueDtos = directItemValue
    } else if (_tplItemType === BASIS_OF_EVALUATION.GRADING) {
      evaluateTplItemValueDtos = gradingItemValue.map((item1, index1) => {
        return { ...item1, seq: index1 + 1 }
      })
    } else if (_tplItemType === BASIS_OF_EVALUATION.OPTIONS) {
      evaluateTplItemValueDtos = evaluateTplItemValue.map((item1, index1) => {
        return { ...item1, seq: index1 + 1 }
      })
    }
    let obj = {
      tplItemBasis,
      tplItemBasisNote,
      tplItemDirectory,
      tplItemName,
      tplItemNote,
      tplItemType,
      evaluateTplItemValueDtos,
      seq: index + 1
    }
    list.push(obj)
  })
  return list
}

// 处理详情时，指标的数据
export function handDetailTpl(evaluateTplItemVos) {
  let list = []
  evaluateTplItemVos.forEach((item) => {
    let {
      tplItemBasis,
      tplItemBasisNote,
      tplItemDirectory,
      tplItemName,
      tplItemNote,
      tplItemType,
      evaluateTplItemId,
      evaluateTplItemValueVos,
      seq
    } = item
    let directItemValue = [
      { seq: 1, value: 0 },
      { seq: 2, value: 0 }
    ]
    let evaluateTplItemValue = [{ value: null }]
    let gradingItemValue = [{ value: null }]
    let _tplItemType = Number(tplItemType)
    tplItemType = String(tplItemType)
    tplItemBasis = String(tplItemBasis)
    if (_tplItemType === BASIS_OF_EVALUATION.DIRECT) {
      directItemValue =
        evaluateTplItemValueVos && evaluateTplItemValueVos.length > 0
          ? evaluateTplItemValueVos
          : directItemValue
    } else if (_tplItemType === BASIS_OF_EVALUATION.GRADING) {
      gradingItemValue =
        evaluateTplItemValueVos && evaluateTplItemValueVos.length > 0
          ? evaluateTplItemValueVos
          : gradingItemValue
    } else if (_tplItemType === BASIS_OF_EVALUATION.OPTIONS) {
      evaluateTplItemValue =
        evaluateTplItemValueVos && evaluateTplItemValueVos.length > 0
          ? evaluateTplItemValueVos
          : evaluateTplItemValue
    }
    let obj = {
      evaluateTplItemId,
      tplItemBasis,
      tplItemBasisNote,
      tplItemDirectory,
      tplItemName,
      tplItemNote,
      tplItemType,
      evaluateTplItemValue,
      gradingItemValue,
      directItemValue,
      seq
    }
    list.push(obj)
  })
  return list
}
