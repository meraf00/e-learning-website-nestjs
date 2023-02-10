// make course cards clickable
const courses = document.querySelectorAll(".course");

courses.forEach((course) => {
  if (course.dataset.link) {
    course.addEventListener("click", () => {
      window.location.href = course.dataset.link;
    });
  }
});

// Tab navigation
const tabNavigationButtons = document.querySelectorAll(".tab-button");
tabNavigationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabNavigationButtons.forEach((btn) => {
      btn.classList.toggle("active", false);

      let target = document.getElementById(btn.dataset.target);
      target.classList.toggle("collapse", true);
    });

    button.classList.toggle("active", true);

    let target = document.getElementById(button.dataset.target);
    target.classList.toggle("collapse", false);
  });
});

// check quiz
const quizForm = document.getElementById("quiz-form");
quizForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const ans1 = quizForm.elements["q1"].value;
  const ans2 = quizForm.elements["q2"].value;

  const choiceDiv1 = document.getElementById(`q1-${ans1}`)?.parentNode;
  const choiceDiv2 = document.getElementById(`q2-${ans2}`)?.parentNode;

  if (ans1 == "C") {
    choiceDiv1?.classList.toggle("quiz__choice--correct", true);
  } else {
    choiceDiv1?.classList.toggle("quiz__choice--wrong", true);
  }

  if (ans2 == "D") {
    choiceDiv2?.classList.toggle("quiz__choice--correct", true);
  } else {
    choiceDiv2?.classList.toggle("quiz__choice--wrong", true);
  }
});

// validate login
const loginForm = document.getElementById("login-form");
loginForm?.addEventListener("submit", (e) => {
  e.preventDefault();

  const passwordField = loginForm.elements["password"];

  if (passwordField.value.length < 6) {
    const message = document.querySelector(".message");
    message.innerHTML = "Password must be atleast 6 characters long.";
    message.classList.toggle("message--error", true);
  } else {
    window.location.href = "index.html";
  }
});
