import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoMdSend } from "react-icons/io";
// import $ from 'jquery'
// import "datatables.net-bs5";
// import 'datatables.net-responsive-bs5'
// import 'datatables.net-dt'
// import 'datatables.net-responsive-dt'

import DataTable from "datatables.net-dt";
import "datatables.net-responsive-dt";
import "datatables.net-bs5";
import "datatables.net-responsive-bs5";

const MatsuriAi = () => {
  const [loading, setLoading] = useState(false);
  const [header, setHeader] = useState([]);
  const [values, setValues] = useState([]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      getQueryResult(event.target.value);
    }
  };

  const getQueryResult = async (value) => { 
      setLoading(true);
      try {
        await axios
          .post("https://matsuri.adraproductstudio.com/defog", {
            question: value,
          })
          .then((response) => {
            console.log(response);
            if (response.data.error_code === 200) {
              setHeader(response.data.data.columns);
              setValues(response.data.data.data);
              setTimeout(() => {
                new DataTable("#example_table", {
                  responsive: true,
                });
                setLoading(false);
              }, 20000);
            }
          })
          .catch((error) => {
            setLoading(false)
            toast.error(error.message);
            if (error.code === "ERR_NETWORK") {
              console.log(error);
              getQueryResult(value);
            }
          });
      } catch (err) {
        console.log(err.code);
      }
    }  

  return (
    <div className="container ">
      <div className="matsuriAi-searchBar">
        <input
          className="form-control fieldBar py-2"
          onKeyDown={handleKeyDown}
          type="text"
          placeholder="Type here..."
          autoFocus
          disabled={loading}
        />

        <span className="matsuriAi-send-icon" onClick={getQueryResult}>
          <IoMdSend />
        </span>
      </div>

      {header.length > 0 ? (
        <div className="card overflow-auto mt-5">
          <div className="card-body ">
            <table className="table table-bordered mt-2" id="example_table">
              <thead>
                <tr>
                  {header.map((head, index) => {
                    return <th key={index}>{head}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {values.map((val, index) => {
                  return (
                    <tr key={index}>
                      {val.map((colValues, index) => {
                        return <td key={index}>{colValues}</td>;
                      })}
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  {header.map((head, index) => {
                    return <th key={index}>{head}</th>;
                  })}
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      ) : loading ? (
        <div class="d-flex justify-content-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <h3 className="row align-items-center justify-content-center">
          Your results will be displayed here
        </h3>
      )
    }
      <Toaster />
    </div>
  )
}
export default MatsuriAi;
