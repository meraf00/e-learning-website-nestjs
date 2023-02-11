const submit_rating = async (target) => {
  const course_id = target.dataset.course_id;
  const rating = document.getElementById(`rate-course-${course_id}`).rating;

  if (!rating) return;

  await rate_course(course_id, rating);

  window.location.href = "user-dashboard.html";
};

const delete_rating = async (target) => {
  const course_id = target.dataset.course_id;

  await delete_course_rating(course_id);

  window.location.href = "user-dashboard.html";
};

const update_rating_ui = (container, rating) => {
  container.rating = rating;

  for (star of container.children) {
    if (star.index <= rating) {
      star.classList.toggle("text-warning", true);
    } else {
      star.classList.toggle("text-warning", false);
    }
  }
};

const make_rating_buttons = () => {
  const star_containers = document.querySelectorAll(".stars");

  star_containers.forEach((star_container) => {
    const stars = star_container.getElementsByTagName("span");

    let star;
    for (let i = 0; i < stars.length; i++) {
      star = stars[i];
      star.index = i + 1;

      star.addEventListener("mouseenter", () => {
        update_rating_ui(star_container, i + 1);
      });
    }
  });
};

make_rating_buttons();
