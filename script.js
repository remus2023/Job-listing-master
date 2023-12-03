//const jobs = document.querySelector("#jobs");
//const filterJobs = document.querySelector("#filterJobs");
//const filterClear = document.querySelector("#filterClear");
console.log(jobs);

async function fetchJobs() {
  try {
    const result = await fetch("./data.json");
    const jobList = await result.json();
    displayJobs(jobList);
    checkFeatured(jobList);
    //displayTagsSelected();
    console.log(jobList);
  } catch (error) {
    console.error(error);
  }
}

fetchJobs();

function displayJobs(arrayJobList) {
  jobs.innerHTML = "";
  arrayJobList.forEach((element) => {
    jobs.innerHTML += `
        <div class="jobs__container" id="jobsContainer">
            <div class="jobs__left" id="jobsLeft"></div>
            <div class="jobs__box">
            <div class="jobs__section" id="jobsSection">
                <img src="${element.logo}" alt="${element.company}" class="jobs__logo" />
                <div class="jobs__details">
                <div class="jobs__features" id="jobsFeatures">
                    <span class="jobs__company">${element.company}</span>
                    <span class="jobs__new" id="jobsNew">NEW!</span>
                    <span class="jobs__featured" id="jobsFeatured">FEATURED</span>
                </div>
                <h1 class="jobs__position">${element.company}</h1>
                <div class="jobs__infos">
                    <span class="jobs__info">${element.postedAt}</span>
                    <span class="jobs__separator"></span>
                    <span class="jobs__info">${element.contract}</span>
                    <span class="jobs__separator"></span>
                    <span class="jobs__info">${element.location}</span>
                </div>
                </div>
            </div>
            <div class="jobs__categories" id="jobsCategories">
            </div>
            </div>
        </div>
        `;
  });
}

function checkFeatured(arrayJobList) {
  const jobsContainer = document.querySelectorAll("#jobsContainer");
  //transform node in array
  //const jobsContainerArray = Array.from(jobsContainer);
  arrayJobList.forEach((elementList, indexList) => {
    jobsContainer.forEach((elementContainer, indexContainer) => {
      if (!elementList.new && indexList === indexContainer) {
        const jobsNew = elementContainer.querySelector("#jobsNew");
        console.log(elementList.featured);
        jobsNew.classList.add("hide");
      }
      if (!elementList.featured && indexList === indexContainer) {
        const jobsFeatured = elementContainer.querySelector("#jobsFeatured");
        const jobsLeft = elementContainer.querySelector("#jobsLeft");
        console.log(jobsLeft);
        jobsFeatured.classList.add("hide");
        jobsLeft.classList.add("featured");
      }
      if (elementList.role && indexList === indexContainer) {
        const jobsCategories =
          elementContainer.querySelector("#jobsCategories");
        const spanCategory = document.createElement("span");
        spanCategory.classList.add("jobs__category");
        spanCategory.id = "jobsCategory";
        spanCategory.textContent = elementList.role;
        jobsCategories.appendChild(spanCategory);
        selectTags(spanCategory);
      }
      if (elementList.level && indexList === indexContainer) {
        const jobsCategories =
          elementContainer.querySelector("#jobsCategories");
        const spanCategory = document.createElement("span");
        spanCategory.classList.add("jobs__category");
        spanCategory.id = "jobsCategory";
        spanCategory.textContent = elementList.level;
        jobsCategories.appendChild(spanCategory);
        selectTags(spanCategory);
      }
      if (elementList.tools.length && indexList === indexContainer) {
        elementList.tools.forEach((elementTools) => {
          const jobsCategories =
            elementContainer.querySelector("#jobsCategories");
          const spanCategory = document.createElement("span");
          spanCategory.classList.add("jobs__category");
          spanCategory.id = "jobsCategory";
          spanCategory.textContent = elementTools;
          jobsCategories.appendChild(spanCategory);
          selectTags(spanCategory);
        });
      }
    });
  });
}

function selectTags(spanElement) {
  spanElement.addEventListener("click", () => {
    const filterJob = document.querySelector("#filterJob");
    console.log(filterJob);
    filter.classList.remove("hide");
    filterJobs.innerHTML += `
    <div class="filter__job" id="filterJob">
        <div class="filter__title">${spanElement.textContent}</div>
            <div class="filter__close" id="filterClose">
                <img src="./images/icon-remove.svg" alt="Close" />
            </div>
    </div>
    `;
    displayTagsSelected(spanElement.textContent);
  });
}

filterClear.addEventListener("click", () => {
  filterJobs.innerHTML = "";
  const jobsContainer = jobs.querySelectorAll("#jobsContainer");
  jobsContainer.forEach((element) => element.classList.remove("hide"));
});

function displayTagsSelected(spanElem) {
  const jobsContainer = jobs.querySelectorAll("#jobsContainer");
  jobsContainer.forEach((elementContainer) => {
    const jobsCategory = elementContainer.querySelectorAll("#jobsCategory");
    const jobsCategoryArray = Array.from(jobsCategory);
    const exist = jobsCategoryArray.some(
      (elementCategory) => elementCategory.textContent === spanElem
    );
    if (!exist) elementContainer.classList.add("hide");
  });
  console.log(jobsContainer);
}
