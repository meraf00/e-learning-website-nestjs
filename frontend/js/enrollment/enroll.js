BASEURL = "http://localhost:3000/api";

const enroll = async (course_id) => {
  const after_two_weeks = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;

  const response = await fetch(`${BASEURL}/enrollment`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      courseId: course_id,
      deadline: new Date(after_two_weeks),
    }),
    mode: "cors",
  }).catch(handleError);

  return response;
};

const get_enrolled_courses = async () => {
  const response = await fetch(`${BASEURL}/enrollment`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      "Content-Type": "application/json",
    },
    mode: "cors",
  }).catch(handleError);

  return await response.json();
};

const delete_enrollment = async (course_id) => {
  const response = await fetch(`${BASEURL}/enrollment/${course_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
    },
    method: "DELETE",
    mode: "cors",
  }).catch(handleError);

  return response;
};

const update_enrollment_deadline = async (course_id, new_deadline) => {
  const response = await fetch(`${BASEURL}/enrollment/${course_id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("TOKEN")}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      deadline: new_deadline,
    }),
    method: "PUT",
    mode: "cors",
  }).catch(handleError);

  return response;
};
