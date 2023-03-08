import { useState } from "react";

const UpdateCompany = () => {
    
    return (
        <Modal
        className="modal fade"
        show={isModalOpen}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Company Details </h5>

            <Button
              variant=""
              type="button"
              className="btn-close"
              data-dismiss="modal"
              onClick={() => setIsModalOpen(false)}
            ></Button>
          </div>
          <div className="modal-body">
            <form className="company-form" onSubmit={(e) => onSubmitHandle(e)}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Name <span className="required"></span>*
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Company Email<span className="required">*</span>{" "}
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      readOnly
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Company Slug<span className="required">*</span>{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="companyID"
                      placeholder="Slug"
                      value={companyID}
                      onChange={(e) => setCompanyID(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="author" className="text-black font-w600">
                      {" "}
                      Company Logo<span className="required">*</span> ({logo})
                      <input type="hidden" name="logo-img" value={logo} />
                    </label>

                    <input
                      type="file"
                      className="form-control"
                      name="logo"
                      onChange={handleFileChange}
                      accept="image/jpeg,image/jpg,image/png"
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label htmlFor="address" className="text-black font-w600">
                      Address
                    </label>
                    <textarea
                      rows={2}
                      className="form-control"
                      name="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <label
                      htmlFor="aboutCompany"
                      className="text-black font-w600"
                    >
                      About Company
                    </label>
                    <textarea
                      rows={3}
                      className="form-control"
                      name="aboutCompany"
                      placeholder="Tell us More"
                      value={aboutCompany}
                      onChange={(e) => setAboutCompany(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group mb-3">
                    <Button
                      style={{ margin: "auto", display: "flex" }}
                      type="submit"
                      value="Submit"
                      className="submit btn btn-primary"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );

}

export default UpdateCompany;