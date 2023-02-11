const enrolled_course_template = (
  course,
  deadline,
  rating_message,
  has_rating
) => {
  const rating = course.rating ? course.rating.toFixed(1) : "No rating";

  deadline = new Date(deadline);

  const old_deadline = `${deadline.getFullYear()}-${(
    "0" +
    (deadline.getMonth() + 1)
  ).slice(-2)}-${("0" + deadline.getDate()).slice(-2)}`;

  return `
  <li class="mt-2">
    <div class="card mb-3" style="max-width: 60rem">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            src="${course.img_url}"
            class="card-img"
            alt="${course.title}"
          />
        </div>
        <div class="col-md-8">
          <!-- Rating modal -->
          <div
            class="modal fade"
            id="rating-modal-course-${course.id}"
            tabindex="-1"
            aria-labelledby="rating-modal-course-${course.id}-label"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="rate-course-${course.id}-label">
                    Rate course
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <div class="text-center">${rating_message}</div>
                  <div
                    class="stars lead text-center mt-2"
                    id="rate-course-${course.id}"
                  >
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                    <span>&#9733;</span>
                  </div>
                  <div class="text-center mt-2 ${has_rating ? "" : "collapse"}">
                    <button                   
                      data-course_id="${course.id}"
                      class="btn btn-warning"
                      onclick="delete_rating(this)">
                      Delete my rating
                    </button>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    data-course_id="${course.id}"
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    onclick="submit_rating(this)"
                  >
                    ${has_rating ? "Update" : "Rate"}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- Extend deadline modal -->
          <div
            class="modal fade"
            id="extend-deadline-modal-course-${course.id}"
            tabindex="-1"
            aria-labelledby="extend-deadline-modal-course-${course.id}-label"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="deadline-course-${
                    course.id
                  }-label">
                    Extend deadline
                  </h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <input                    
                    id="deadline-course-${course.id}"
                    type="date"
                    value="${old_deadline}"
                  >
                    
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    data-course_id="${course.id}"
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    onclick="update_deadline(this)"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- card -->
          <div class="card-body">
            <h5 class="card-title">
              ${course.title}
            </h5>
            <p class="card-text">
              ${course.description}
            </p>
            <div class="d-flex justify-content-between me-5">
              <p class="card-text text-primary-emphasis">&#9733; ${rating}</p>
              <p class="card-text text-secondary-emphasis">${deadline.toDateString()}</p>
            </div>
            <a
              href="${course.id}-course.html"                            
              class="btn btn-primary"
              >Continue...</a
            >
            <a              
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#rating-modal-course-${course.id}"
              class="btn btn-primary"
              >Rate course</a
            >
            <a              
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#extend-deadline-modal-course-${course.id}"
              class="btn btn-primary"
              >Push deadline</a
            >
            <a  
              data-course_id="${course.id}"            
              class="btn btn-danger"
              onclick="quit_enrollment(this)"
              >Quit course</a
            >
          </div>
        </div>
      </div>
    </div>
  </li>
  `;
};

const update_dashboard_ui = async () => {
  const enrolled_courses = await get_enrolled_courses();

  if (enrolled_courses.statusCode == 401) {
    window.location.href = "login.html";
  }

  const inprogress_div = document.getElementById("in-progress");
  const inprogress_message = document.getElementById("in-progress-message");

  if (!inprogress_div) return;

  if (enrolled_courses.length == 0) {
    inprogress_message?.classList.toggle("collapse", false);
    return;
  } else {
    inprogress_message?.classList.toggle("collapse", true);
  }

  let course;
  let rating;
  let message;
  for (let enrollment of enrolled_courses) {
    course = await get_course_by_id(enrollment.courseId);
    rating = await get_my_course_rating(enrollment.courseId);

    if (rating) {
      message = "Your previous rating was " + rating;
      has_rating = true;
    } else {
      message = "You haven't rated this course before";
      has_rating = false;
    }

    inprogress_div.innerHTML += enrolled_course_template(
      course,
      enrollment.deadline,
      message,
      has_rating
    );
  }

  make_rating_buttons();
};

const enroll_course = async (course_id) => {
  const response = await enroll(course_id);
  const res_json = await response.json();

  if (res_json.status == 201) {
    window.location.href = `${course_id}-course.html`;
  } else if (response.status == 401) {
    window.location.href = `login.html`;
  } else {
    const message = document.querySelector(".message");
    message.innerHTML = res_json.message;
    message.classList.toggle("text-danger", true);
  }
};

const update_deadline = async (target) => {
  const course_id = target.dataset.course_id;
  const new_deadline = document.getElementById(
    `deadline-course-${course_id}`
  ).value;

  if (!new_deadline) return;

  const res = await update_enrollment_deadline(course_id, new_deadline);

  window.location.href = "user-dashboard.html";
};

const quit_enrollment = async (button) => {
  const course_id = button.dataset.course_id;
  await delete_enrollment(course_id);
  window.location.href = "user-dashboard.html";
};

const start_course = document.getElementById("start-course-btn");

start_course?.addEventListener("click", (e) => {
  e.preventDefault();
  const course_id = e.target.dataset.course_id;
  enroll_course(course_id);
});

update_dashboard_ui();
