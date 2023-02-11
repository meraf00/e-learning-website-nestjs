BASEURL = "http://localhost:3000/api";

const rate_course = async (course_id, rating) => {
  const response = await fetch(`${BASEURL}/rating/${course_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      rating,
    }),
    mode: "cors",
  }).catch(handleError);

  return response;
};

const get_my_course_rating = async (course_id) => {
  const response = await fetch(`${BASEURL}/rating/${course_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
    method: "GET",
    mode: "cors",
  }).catch(handleError);
  
  return (await response.json()).rating;
};

const delete_course_rating = async (course_id) => {
  const response = await fetch(`${BASEURL}/rating/${course_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
    method: "DELETE",
    mode: "cors",
  }).catch(handleError);

  return response;
};
