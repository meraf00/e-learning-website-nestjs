const search_result_container = document.getElementById("search-results");
const search_form = document.getElementById("search-form");

const search = async () => {
  const keyword = document.getElementById("search__field").value;
  const difficulty = document.getElementById("course-difficulty").value;
  const length = document.getElementById("course-length").value;
  console.log(keyword, difficulty, length);
  const result = await filter_course(keyword, difficulty, length);

  if (result.length) {
    search_result_container.innerHTML = "";
  } else {
    search_result_container.innerHTML =
      "<div class='m-2'>No search results</div>";
  }

  for (let course of result) {
    search_result_container.innerHTML += card_template(course);
  }
};

search_form?.addEventListener("submit", (e) => {
  e.preventDefault();

  search();
});
search();
