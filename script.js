/*
    Targeted Elements:
        -Target the form

    Functions:
        -fetchProfileData
        -getInitialProfile
        -getSearchedProfile
        -displayProfile


    Event Listeners:
        -Listen for submission of the form
*/

// Target Elements
const form = document.getElementById("form");
const imageContainer = document.getElementById("image_container");
const profileUsername = document.getElementById("github_name");
const profileBio = document.getElementById("github_bio");
const profileFollowers = document.getElementById("github_followers");
const profileFollowing = document.getElementById("github_following");
const profileRepos = document.getElementById("github_repos");
const profileProjects = document.getElementById("projects_list");

// API Endpoints
const githubAPI = "https://api.github.com/users/";
const githubReposAPI = "https://api.github.com/users/sean21johnson/repos";
/* Data received from the endpoint that we need for the application (properties):
        -avatar_url (picture), login (name), bio, followers, following, public_repos
    */

// My profile & random variables
const initialUsername = "sean21johnson";
const repoString = "/repos";

// getInitialProfile
// take the initialProfile constant and pass it into fetchProfileData
function getInitialProfile() {
	fetchProfileData(initialUsername);
}

// fetchProjectsList
// Take the username of the profile and get a response back from the API that contains a list of projects/repos
async function fetchProjectsList(username) {
	const response = await fetch(`${githubAPI}${username}${repoString}`);
	const responseJson = await response.json();

	let projectNamesHTML = "";

	responseJson.slice(0, 10).forEach((project) => {
		return (projectNamesHTML += `<li class="project_item" id="project_item">${project.name}<li>`);
	});

    profileProjects.innerHTML = projectNamesHTML;
}

// fetchProfileData
// take the username passed in (Whether searched or the initial load) and get back data to pass into displayProfile function
async function fetchProfileData(username) {
	const response = await fetch(`${githubAPI}${username}`);
	const responseJson = await response.json();

	displayUserDetails(responseJson);
}

// displayUser
function displayUserDetails(userData) {
	const {
		avatar_url: profilePictureURL,
		login: githubUsername,
		bio: userBio,
		followers: followerCount,
		following: followingCount,
		public_repos: repoCount,
	} = userData;

	// change the innerHTML of the image container to add an image to it
	imageContainer.innerHTML = `
        <img src=${profilePictureURL} alt="avatar">
    `;
	// Take the user data and change the inner text of the elements targeted at the top
	profileUsername.innerText = githubUsername;
	profileBio.innerText = userBio;
	profileFollowers.innerText = `${followerCount} Followers`;
	profileFollowing.innerText = `${followingCount} Following`;
	profileRepos.innerText = `${repoCount} Repos`;

	fetchProjectsList(githubUsername);
}

function handleSearchSubmission(e) {
	e.preventDefault();

	const searchedUser = e.target.profile.value;

	fetchProfileData(searchedUser);

    e.target.profile.value = "";
}

// Listen for a form submission on an input search event
form.addEventListener("submit", handleSearchSubmission);

// Home page load
getInitialProfile();
