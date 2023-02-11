const card_template = (course) => {
  const rating = course.rating ? course.rating.toFixed(1) : "Not rated yet";

  return `<div class="col">
          <div class="card shadow mb-4" style="width: 16rem">
            <img
              class="card-img-top"
              src="${course.img_url}"
              alt="${course.title} thumbnail"
            />
            <div class="card-body">
              <h5 class="card-title">${course.title}</h5>
              <p class="card-text">
                ${course.description}
              </p>
              <p class="card-text text-primary-emphasis">&#9733; ${rating}</p>
              <a href="${course.id}-course-overview.html" class="btn btn-primary"
                >Course overview</a
              >
            </div>
          </div>
        </div>`;
};
