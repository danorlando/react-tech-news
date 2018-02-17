var PageNumberMixin = {
  getPageNumber(page) {
    console.log(this.props)
    if (typeof page == 'undefined') {
      page = 1
    //  page = this.props.location.query.page
    }
    return (page && /^\d+$/.test(page) ? Math.max(1, Number(page)) : 1)
  }
}

module.exports = PageNumberMixin
