export function segment (firstElement, lastElement) {
  return Array.from(
    { length: lastElement - firstElement + 1 },
    (_, i) => i + firstElement
  )
}

class PaginationNumbers {
  constructor (number) {
    this.number = number
  }

  integerPositive () {
    if (isNaN(parseFloat(this.number))) {
      throw new Error(`${this.number} is not a number`)
    }

    return Math.floor(Math.abs(parseFloat(this.number)))
  }
}

export class PaginationIndices {
  constructor ({ page, totalPages, adjacentIndices = 2, segment }) {
    this.page = this.resolvePageConstraint(page, totalPages)
    this.totalPages = this.resolveTotalPagesConstraint(totalPages)
    this.adjacentIndices =
      this.resolveAdjacentIndicesConstraint(adjacentIndices)

    this.variationLength = null
    this.calculateVariationLength()
    this.segment = segment

    // init left and right indices
    this.leftIndex = null
    this.middleIndex = null
    this.rightIndex = null
    this._centerIndices = null

    this.paginationIndices = null
  }

  resolvePageConstraint (page, totalPages) {
    try {
      const _page = new PaginationNumbers(page).integerPositive()
      const _totalPages = new PaginationNumbers(totalPages).integerPositive()
      if (_page < 1) return 1
      if (_page > _totalPages) return _totalPages
      return _page
    } catch (error) {
      throw new Error(error)
    }
  }

  resolveTotalPagesConstraint (totalPages) {
    try {
      const _totalPages = new PaginationNumbers(totalPages).integerPositive()
      if (_totalPages < 1) return 1
      return _totalPages
    } catch (error) {
      throw new Error(error)
    }
  }

  resolveAdjacentIndicesConstraint (adjacentIndices) {
    try {
      const _adjacentIndices = new PaginationNumbers(
        adjacentIndices
      ).integerPositive()
      if (_adjacentIndices < 1) return 2
      return _adjacentIndices
    } catch (error) {
      throw new Error(error)
    }
  }

  calculateVariationLength () {
    this.variationLength = 2 * this.adjacentIndices + 5
  }

  readjustAdjacentIndices () {
    if (this.totalPages - this.variationLength < 1) {
      this.adjacentIndices = Math.floor((this.totalPages - 6) / 2)
    }
  }

  left () {
    if (this.page <= this.adjacentIndices + 3) {
      this.leftIndex = 2
    } else {
      this.leftIndex = '...'
    }
  }

  right () {
    if (this.page >= this.totalPages - (this.adjacentIndices + 2)) {
      this.rightIndex = this.totalPages - 1
    } else {
      this.rightIndex = '...'
    }
  }

  readjustMiddleIndex () {
    if (this.page < this.adjacentIndices + 3) {
      this.middleIndex = this.adjacentIndices + 3
    } else if (this.page > this.totalPages - (this.adjacentIndices + 2)) {
      this.middleIndex = this.totalPages - (this.adjacentIndices + 2)
    } else {
      this.middleIndex = this.page
    }
  }

  centerIndices () {
    const startIndex = this.middleIndex - this.adjacentIndices
    const endIndex = this.middleIndex + this.adjacentIndices
    this._centerIndices = this.segment(startIndex, endIndex)
  }

  segmentPagination () {
    this.readjustAdjacentIndices()
    this.calculateVariationLength()

    this.left()
    this.right()
    this.readjustMiddleIndex()
    this.centerIndices()

    this.paginationIndices = [
      1,
      this.leftIndex,
      ...this._centerIndices,
      this.rightIndex,
      this.totalPages
    ]
  }

  getPaginationIndices () {
    if (this.totalPages <= 7) {
      this.paginationIndices = this.segment(1, this.totalPages)
    } else {
      this.segmentPagination()
    }

    return this.paginationIndices
  }
}
