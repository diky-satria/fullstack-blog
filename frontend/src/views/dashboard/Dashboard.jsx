import React, { useEffect, useState } from "react";
import axios from "../../interceptor/axios";

export default function Dashboard() {
  const [data, setData] = useState("");
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    let response = await axios.get("/api/user");
    setData(response.data.message);
  };
  return (
    <div className="c-content">
      <div className="c-content-header">
        <h4>Dashboard {data}</h4>
        <p>Overview</p>
      </div>
      <div className="row">
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">Card 1</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">Card 2</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">Card 3</div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card">
            <div className="card-body">Card 4</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">Card 5</div>
          </div>
        </div>
        <div className="col-md-6 mb-3">
          <div className="card">
            <div className="card-body">Card 6</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-8 mb-3">
          <div className="card">
            <div className="card-body">Card 7</div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card">
            <div className="card-body">Card 8</div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md mb-3">
          <div className="card">
            <div className="card-body" style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam error vero dolores nesciunt fugiat voluptatibus, animi
              dignissimos exercitationem commodi non velit corporis mollitia
              corrupti perspiciatis doloremque totam temporibus aspernatur
              distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Laboriosam error vero dolores nesciunt fugiat voluptatibus,
              animi dignissimos exercitationem commodi non velit corporis
              mollitia corrupti perspiciatis doloremque totam temporibus
              aspernatur distinctio! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Laboriosam error vero dolores nesciunt fugiat
              voluptatibus, animi dignissimos exercitationem commodi non velit
              corporis mollitia corrupti perspiciatis doloremque totam
              temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laboriosam error vero dolores
              nesciunt fugiat voluptatibus, animi dignissimos exercitationem
              commodi non velit corporis mollitia corrupti perspiciatis
              doloremque totam temporibus aspernatur distinctio! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Laboriosam error vero
              dolores nesciunt fugiat voluptatibus, animi dignissimos
              exercitationem commodi non velit corporis mollitia corrupti
              perspiciatis doloremque totam temporibus aspernatur distinctio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam error vero dolores nesciunt fugiat voluptatibus, animi
              dignissimos exercitationem commodi non velit corporis mollitia
              corrupti perspiciatis doloremque totam temporibus aspernatur
              distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Laboriosam error vero dolores nesciunt fugiat voluptatibus,
              animi dignissimos exercitationem commodi non velit corporis
              mollitia corrupti perspiciatis doloremque totam temporibus
              aspernatur distinctio! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Laboriosam error vero dolores nesciunt fugiat
              voluptatibus, animi dignissimos exercitationem commodi non velit
              corporis mollitia corrupti perspiciatis doloremque totam
              temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laboriosam error vero dolores
              nesciunt fugiat voluptatibus, animi dignissimos exercitationem
              commodi non velit corporis mollitia corrupti perspiciatis
              doloremque totam temporibus aspernatur distinctio! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Laboriosam error vero
              dolores nesciunt fugiat voluptatibus, animi dignissimos
              exercitationem commodi non velit corporis mollitia corrupti
              perspiciatis doloremque totam temporibus aspernatur distinctio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam error vero dolores nesciunt fugiat voluptatibus, animi
              dignissimos exercitationem commodi non velit corporis mollitia
              corrupti perspiciatis doloremque totam temporibus aspernatur
              distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Laboriosam error vero dolores nesciunt fugiat voluptatibus,
              animi dignissimos exercitationem commodi non velit corporis
              mollitia corrupti perspiciatis doloremque totam temporibus
              aspernatur distinctio! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Laboriosam error vero dolores nesciunt fugiat
              voluptatibus, animi dignissimos exercitationem commodi non velit
              corporis mollitia corrupti perspiciatis doloremque totam
              temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laboriosam error vero dolores
              nesciunt fugiat voluptatibus, animi dignissimos exercitationem
              commodi non velit corporis mollitia corrupti perspiciatis
              doloremque totam temporibus aspernatur distinctio! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Laboriosam error vero
              dolores nesciunt fugiat voluptatibus, animi dignissimos
              exercitationem commodi non velit corporis mollitia corrupti
              perspiciatis doloremque totam temporibus aspernatur distinctio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam error vero dolores nesciunt fugiat voluptatibus, animi
              dignissimos exercitationem commodi non velit corporis mollitia
              corrupti perspiciatis doloremque totam temporibus aspernatur
              distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Laboriosam error vero dolores nesciunt fugiat voluptatibus,
              animi dignissimos exercitationem commodi non velit corporis
              mollitia corrupti perspiciatis doloremque totam temporibus
              aspernatur distinctio! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Laboriosam error vero dolores nesciunt fugiat
              voluptatibus, animi dignissimos exercitationem commodi non velit
              corporis mollitia corrupti perspiciatis doloremque totam
              temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laboriosam error vero dolores
              nesciunt fugiat voluptatibus, animi dignissimos exercitationem
              commodi non velit corporis mollitia corrupti perspiciatis
              doloremque totam temporibus aspernatur distinctio! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Laboriosam error vero
              dolores nesciunt fugiat voluptatibus, animi dignissimos
              exercitationem commodi non velit corporis mollitia corrupti
              perspiciatis doloremque totam temporibus aspernatur distinctio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam error vero dolores nesciunt fugiat voluptatibus, animi
              dignissimos exercitationem commodi non velit corporis mollitia
              corrupti perspiciatis doloremque totam temporibus aspernatur
              distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Laboriosam error vero dolores nesciunt fugiat voluptatibus,
              animi dignissimos exercitationem commodi non velit corporis
              mollitia corrupti perspiciatis doloremque totam temporibus
              aspernatur distinctio! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Laboriosam error vero dolores nesciunt fugiat
              voluptatibus, animi dignissimos exercitationem commodi non velit
              corporis mollitia corrupti perspiciatis doloremque totam
              temporibus aspernatur distinctio! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Laboriosam error vero dolores
              nesciunt fugiat voluptatibus, animi dignissimos exercitationem
              commodi non velit corporis mollitia corrupti perspiciatis
              doloremque totam temporibus aspernatur distinctio! Lorem ipsum
              dolor sit amet consectetur adipisicing elit. Laboriosam error vero
              dolores nesciunt fugiat voluptatibus, animi dignissimos
              exercitationem commodi non velit corporis mollitia corrupti
              perspiciatis doloremque totam temporibus aspernatur distinctio!
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Laboriosam error vero dolores nesciunt fugiat voluptatibus, animi
              dignissimos exercitationem commodi non velit corporis mollitia
              corrupti perspiciatis doloremque totam temporibus aspernatur
              distinctio! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Laboriosam error vero dolores nesciunt fugiat voluptatibus,
              animi dignissimos exercitationem commodi non velit corporis
              mollitia corrupti perspiciatis doloremque totam temporibus
              aspernatur distinctio! Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Laboriosam error vero dolores nesciunt fugiat
              voluptatibus, animi dignissimos exercitationem commodi non velit
              corporis mollitia corrupti perspiciatis doloremque totam
              temporibus aspernatur distinctio!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
