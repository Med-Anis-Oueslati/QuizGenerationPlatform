import React from 'react'
import "./ServicePage.css";
function ServicePage() {
  return (
    <div name="Services">
      <div className="service-page">
        <div className="container10" style={{ marginTop: "150px" }}>
          <h1>Our services</h1>
          <div className="row2">
            <div className="services1">
              <h2 style={{ marginBottom: "50px" }}> For Teachers</h2>
              <p>
                Empower your teaching experience with our platform. Upload your
                learning materials effortlessly and watch as our system
                transforms them into engaging quizzes tailored to your
                curriculum. Simplify assessment creation and enhance student
                engagement with our intuitive tools. Join today and
                revolutionize your teaching approach.
              </p>
            </div>
            <div className="services1">
              <h2 style={{ marginBottom: "50px" }}> For Students</h2>
              <p>
                Unlock the power of personalized learning with our platform.
                Access interactive quizzes generated from your course materials,
                designed to reinforce your understanding and boost retention.
                Explore, learn, and succeed at your own pace with our
                user-friendly interface. Join the journey towards academic
                excellence today.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServicePage;