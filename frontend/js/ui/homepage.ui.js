const top_courses_container = document.getElementById("top-courses");

const display_top_courses = async () => {
  const courses = await get_courses((page = 0), (limit = 5));

  for (course of courses) {
    top_courses_container.innerHTML += card_template(course);
  }
};

display_top_courses();
