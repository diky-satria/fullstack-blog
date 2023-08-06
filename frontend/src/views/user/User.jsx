import React, { useEffect, useState } from "react";
import axios from "../../interceptor/axios";
import UserAll from "./component/UserAll";
import UserFormAdd from "./component/UserFormAdd";

export default function User() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [limit] = useState(10);

  useEffect(() => {
    getAllUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  const getAllUser = async () => {
    let response = await axios.get(
      `/api/user?search=${search}&page=${page}&limit=${limit}`
    );

    setData(response.data.data);
    setPage(response.data.page);
    setTotalPage(response.data.total_page);
    setTotalRows(response.data.total_rows);
  };

  const changeSearchFunction = (search) => {
    setPage(0);
    setSearch(search);
  };
  return (
    <div className="c-content">
      <div className="c-content-header">
        <h4>User</h4>
        <p>Semua user</p>
      </div>
      <div className="row">
        <div className="col-md-8 mb-3">
          <UserAll
            data={data}
            page={page}
            setPage={setPage}
            limit={limit}
            totalPage={totalPage}
            totalRows={totalRows}
            handlePageClick={(selected) => setPage(selected)}
            changeSearch={(search) => changeSearchFunction(search)}
            getAllUser={getAllUser}
            setTotalRows={setTotalRows}
          />
        </div>
        <div className="col-md-4 mb-3">
          <UserFormAdd getAllUser={getAllUser} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  );
}
