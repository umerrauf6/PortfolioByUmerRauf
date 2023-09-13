import React from "react";
import images from "../../assets/images";
import "./education.scss";
import { AppWrap, MotionWrap } from "../../wrapper";

const Education = () => {
  const umerData = [
    {
      img: `${images.pgc}`,
      date: "2015-2017",
      degree: "Intermediate(FSc) Certificate",
      institute: "Punjab College Gujrat",
      address: "Gujrat, Punjab, Pakistan",
    },
    {
      img: `${images.uog}`,
      date: "2018-2022",
      degree: "BS in Software Engineering",
      institute: "University of Gujrat",
      address: "Gujrat, Punjab, Pakistan",
    },
  ];

  return (
    <>
      <h2 className="head-text">My Education</h2>
      <div className="education__section ">
        {umerData.map((data) => {
          return (
            <div className="education__section-container gradient__bg">
              <div className="education__section-container_img">
                <img src={data.img} alt="" />
              </div>
              <div className="education__section-container_text">
                <div className="education__section-container_text-date">
                  <p>{data.date}</p>
                </div>
                <div className="education__section-container_text-degree">
                  <h4>{data.degree}</h4>
                </div>
                <div className="education__section-container_text-institute">
                  <p>{data.institute}</p>
                </div>
                <div className="education__section-container_text-address">
                  <p>{data.address}</p>
                </div>
              </div>

              <div></div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Education, "app__education"),
  "education",
  "app__whitebg"
);
