import React, { useState } from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { data, isLoading } = useQuery({
    queryKey: [`${item.userId}`],
    queryFn: () =>
      newRequest.get(`users/${item.userId}`).then((res) => res.data),
  });

  const [loading, setLoading] = useState(isLoading);

  return (
    <Link to="/gig/123" className="link">
      {loading ? (
        <div className="gigCard">
          <img
            src={item.cover || "../../../public/img/defaultimg.jpg"}
            alt=""
          />
          <div className="info">
            <div className="user">
              <img
                src={
                  item.pp ||
                  "https://icons-for-free.com/iconfiles/png/512/avatar+circle+male+profile+user+icon-1320196710301016992.png"
                }
                alt=""
              />
              <span>{data?.data?.username}</span>
            </div>
            <p>{item.desc}</p>
            <div className="star">
              <img src="../img/star.png" alt="" />
              <span>
                {Math.round(data?.data?.totalStart / data?.data?.starNumber) ||
                  0}
              </span>
            </div>
          </div>
          <hr />
          <div className="detail">
            <img src="./img/heart.png" alt="" />
            <div className="price">
              <span>STARTING AT</span>
              <h2>
                $ {item.price}
                <sup>99</sup>
              </h2>
            </div>
          </div>
        </div>
      ) : (
        "loading..."
      )}
    </Link>
  );
};

export default GigCard;
