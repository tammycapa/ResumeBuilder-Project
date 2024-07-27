const { getItemsFromStorage, init } = require("../src/main");

describe("Resume Builder Tests", () => {
  beforeEach(() => {
    // Mock DOM elements
    document.body.innerHTML = `
      <form id="resume-form">
        <input id="job-title-input" />
        <input id="company-input" />
        <input id="employment-start-input" />
        <input id="employment-end-input" />
        <input id="responsibilities-input" />
        <button type="submit" class="add-btn"></button>
        <button type="button" class="cancel-btn"></button>
      </form>
      <ul id="resume-list"></ul>
      <button id="clear"></button>
    `;

    // Mock localStorage
    localStorage.clear();
    init();
  });

  test("should render DOM", () => {
    expect(document.getElementById("resume-form")).not.toBeNull();
    expect(document.getElementById("resume-list")).not.toBeNull();
    expect(document.getElementById("clear")).not.toBeNull();
  });

  test("should add an item to localStorage", () => {
    document.getElementById("job-title-input").value = "Software Enginner";
    document.getElementById("company-input").value = "Company X";
    document.getElementById("employment-start-input").value = "March 2022";
    document.getElementById("employment-end-input").value = "August 2024";
    document.getElementById("responsibilities-input").value =
      "Developing software";

    document.querySelector(".add-btn").click();

    const items = getItemsFromStorage();
    expect(items.length).toBe(1);
    expect(items[0].jobTitle).toBe("Software Enginner");
  });

  test("should display added item in DOM", () => {
    document.getElementById("job-title-input").value = "Front-End Developer";
    document.getElementById("company-input").value = "Startup A";
    document.getElementById("employment-start-input").value = "October 2020";
    document.getElementById("employment-end-input").value = "February 2022";
    document.getElementById("responsibilities-input").value =
      "Developing new website features";

    document.querySelector(".add-btn").click();

    const listItem = document.querySelector("ul#resume-list li");
    expect(listItem).not.toBeNull();
    expect(listItem.textContent).toContain("Front-End Developer at Startup A");
  });

  test("should remove all added items when clear button is clicked", () => {
    document.getElementById("job-title-input").value = "Software Enginner";
    document.getElementById("company-input").value = "Company X";
    document.getElementById("employment-start-input").value = "March 2022";
    document.getElementById("employment-end-input").value = "August 2024";
    document.getElementById("responsibilities-input").value =
      "Developing software";
    document.querySelector(".add-btn").click();

    const listItem = document.querySelector("ul#resume-list li");
    expect(listItem).not.toBeNull();
    expect(listItem.textContent).toContain("Software Enginner at Company X");

    document.getElementById("clear").click();
    expect(document.querySelector("ul#resume-list li")).toBeNull();
  });

  test("should delete an item", () => {
    // Add an item to be deleted
    document.getElementById("job-title-input").value = "Front-End Developer";
    document.getElementById("company-input").value = "Startup A";
    document.getElementById("employment-start-input").value = "October 2020";
    document.getElementById("employment-end-input").value = "February 2022";
    document.getElementById("responsibilities-input").value =
      "Developing new website features";

    let listItem = document.querySelector("ul#resume-list li");
    expect(listItem).not.toBeNull();

    const removeButton = listItem.querySelector(".remove-item");
    expect(removeButton).not.toBeNull();
    removeButton.click();

    expect(document.querySelector("ul#resume-list li")).toBeNull();
  });
});
