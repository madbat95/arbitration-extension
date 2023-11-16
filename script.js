// function fetchData() {
//   axios
//     .get("https://api.arbitrationagreement.com/blogs/")
//     .then((response) => {
//       const blogList = document.getElementById("blogList");

//       response.data
//         .filter((blog) => blog.is_visible === true)
//         .forEach((blog) => {
//           // Create list item
//           const anchorTag = document.createElement("a");
//           anchorTag.href = `https://arbitrationagreement.com/blog/${blog.id}`;
//           anchorTag.innerText = blog.title;

//           // Set the target attribute to "_blank" to open in a new tab
//           anchorTag.target = "_blank";

//           const listItem = document.createElement("li");
//           listItem.className = "list-group-item";
//           listItem.style.display = "none";
//           listItem.appendChild(anchorTag);

//           // Append the list item to the list
//           blogList.appendChild(listItem);
//         });
//     })
//     .catch((error) => console.error("Error fetching data:", error));
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const switchInput = document.getElementById("flexSwitchCheckDefault");
//   fetchData();
//   switchInput.addEventListener("change", function () {
//     const blogItems = document.querySelectorAll(".list-group-item");

//     blogItems.forEach((item) => {
//       if (switchInput.checked) {
//         item.style.display = "block";
//       } else {

//         item.style.display = "none";
//       }
//     });
//   });
// });

function fetchData() {
  axios
    .get("https://api.arbitrationagreement.com/blogs/")
    .then((response) => {
      const blogList = document.getElementById("blogList");
      const switchInput = document.getElementById("flexSwitchCheckDefault");

      // Clear the existing blog list
      blogList.innerHTML = "";

      const visibleBlogs = response.data.filter(
        (blog) => blog.is_visible === true
      );

      if (visibleBlogs.length === 0 && switchInput.checked) {
        // Display the message when there are no blogs and the switch is checked
        const alertDiv = document.createElement("div");
        alertDiv.className = "alert alert-warning";
        alertDiv.setAttribute("role", "alert");
        alertDiv.innerText =
          "Sorry, we have not published any blogs right now.";
        blogList.appendChild(alertDiv);
      } else {
        // Display the blogs
        visibleBlogs.forEach((blog) => {
          // Create list item
          const anchorTag = document.createElement("a");
          anchorTag.href = `https://arbitrationagreement.com/blog/${blog.id}`;
          anchorTag.innerText = blog.title;

          // Set the target attribute to "_blank" to open in a new tab
          anchorTag.target = "_blank";

          const listItem = document.createElement("li");
          listItem.className = "list-group-item";
          listItem.style.display = switchInput.checked ? "block" : "none";
          listItem.appendChild(anchorTag);

          // Append the list item to the list
          blogList.appendChild(listItem);
        });
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  const switchInput = document.getElementById("flexSwitchCheckDefault");
  const blogList = document.getElementById("blogList");

  switchInput.addEventListener("change", function () {
    const blogItems = document.querySelectorAll(".list-group-item");

    blogItems.forEach((item) => {
      if (switchInput.checked) {
        // Show the list items when the switch is checked
        item.style.display = "block";
      } else {
        // Hide the list items when the switch is unchecked
        item.style.display = "none";
      }
    });
    fetchData();

    // if (!switchInput.checked) {
    //   // If switch is unchecked, clear existing blog list and display the message
    //   blogList.innerHTML = "";
    //   const alertDiv = document.createElement("div");
    //   alertDiv.className = "alert alert-warning";
    //   alertDiv.setAttribute("role", "alert");
    //   alertDiv.innerText = "Sorry, we have not published any blogs right now.";
    //   blogList.appendChild(alertDiv);
    // } else {
    //   // If switch is checked, fetch and display data
    //   fetchData();
    // }
  });

  // Initial check for toggle state on page load
  // if (!switchInput.checked) {
  //   // If switch is unchecked on page load, display the message
  //   blogList.innerHTML = "";
  //   const alertDiv = document.createElement("div");
  //   alertDiv.className = "alert alert-warning";
  //   alertDiv.setAttribute("role", "alert");
  //   alertDiv.innerText = "Sorry, we have not published any blogs right now.";
  //   blogList.appendChild(alertDiv);
  // } else {
  //   // If switch is checked on page load, fetch and display data
  //   fetchData();
  // }
});
