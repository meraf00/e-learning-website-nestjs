BASEURL = "http://localhost:3000/api";

const get_courses = async (page = 0, limit = 50) => {
  const response = await fetch(
    `${BASEURL}/course?page=${page}&limit=${limit}`,
    {
      mode: "cors",
    }
  ).catch(handleError);

  return await response.json();
};

const filter_course = async (
  title,
  difficulty,
  length,
  page = 0,
  limit = 50
) => {
  const response = await fetch(
    `${BASEURL}/course?title=${title}&difficulty=${difficulty}&length=${length}`,
    {
      mode: "cors",
    }
  ).catch(handleError);

  return await response.json();
};

const get_course_by_id = async (course_id) => {
  const response = await fetch(`${BASEURL}/course/${course_id}`, {
    mode: "cors",
  }).catch(handleError);

  return await response.json();
};
