<>
<div className="divContainer">
  {userInfo ? (
    <>
      <div>
        <p className="welcome"> Welcome {userInfo.firstName} </p>
      </div>
      <div className="line"></div>
      <div className="profile">
        <p className="details">Account Details:</p>
        <div className="userInfo">
          <div className="profileImg">
            <img
              src={imag}
              alt="userImg"
              className="userImg"/>
          </div>
          <div className="infoProfile">

          <p>
            {" "}
            {userInfo.firstName} {userInfo.lastName}{" "}
          </p>
            <p> {userInfo.email} </p>
          </div>
        </div>
      </div>
    </>
  ) : (
    <></>
  )}
</div>
</>