const inputValue = document.querySelector('#search');
const searchButton = document.querySelector('.searchButton');
const imageContainer = document.querySelector('.image');
const dateContainer = document.querySelector('.joined-date');
const nameContainer = document.querySelector('.main_profile-name');
const unContainer = document.querySelector('.main_profile-username');
const bioContainer = document.querySelector('.bio-info');
const reposContiner = document.querySelector('.main_profile-repos');
const followersContiner = document.querySelector('.main_profile-followers');
const followingContiner = document.querySelector('.main_profile-following');
const cityContainer = document.querySelector('.city');
const twitterContainer = document.querySelector('.twitter');
const urlContainer = document.querySelector('.main_profile-url');
const companyContainer = document.querySelector('.company');

const noresults = document.querySelector('.noresults');

const client_secret = '7753fdad58bb42c0d28741064dc7aa67381d8530';
const client_id = 'Iv1.71a7a9f9a18f113a';

const fetchUsers = async (user = 'octocat') => {
    const api_call = await fetch(
        `https://api.github.com/users/${user}?client_id=${client_id}&client_secret=${client_secret}`
    );

    const data = await api_call.json();
    return { data };
};

const updateUsers = (res) => {
    function setOPacity(api_data, data) {
        if (api_data == '' || api_data === null) {
            data.style.opacity = 0.5;
            data.style.textDecoration = 'none';
            data.previousElementSibling.style.opacity = 0.5;
            return 'Not available';
        } else {
            return `${api_data}`;
        }
    }

    if (res.data.message !== 'Not Found') {
        noresults.style.display = 'none';

        imageContainer.innerHTML = `<img src="${res.data.avatar_url}"/>`;

        nameContainer.innerHTML =
            res.data.name == null ? `${res.data.login}` : `${res.data.name}`;

        unContainer.innerHTML = `@${res.data.login}`;

        var parts = res.data.created_at.split('T').shift().split('-');
        var myDate = new Date(parts[0], parts[1] - 1, parts[2]);

        dateContainer.innerHTML = `Joined ${myDate
            .toDateString()
            .split(' ')
            .slice(1)
            .join(' ')}`;

        if (res.data.bio == null) {
            bioContainer.innerHTML = 'This profile has no bio';
            bioContainer.style.opacity = 0.75;
        } else {
            bioContainer.innerHTML = `${res.data.bio}`;
        }

        reposContiner.innerHTML = `${res.data.public_repos}`;

        followersContiner.innerHTML = `${res.data.followers}`;

        followingContiner.innerHTML = `${res.data.following}`;

        cityContainer.innerHTML = setOPacity(res.data.location, cityContainer);

        urlContainer.innerHTML = setOPacity(res.data.blog, urlContainer);

        urlContainer.href =
            res.data.blog === '' || res.data.blog == null ? '' : res.data.blog;

        twitterContainer.innerHTML = setOPacity(
            res.data.twitter_username,
            twitterContainer
        );

        twitterContainer.href =
            res.data.twitter_username == null
                ? ''
                : 'https://twitter.com/' + res.data.twitter_username;

        companyContainer.innerHTML = setOPacity(
            res.data.company,
            companyContainer
        );

        companyContainer.href =
            res.data.company === '' || res.data.company == null
                ? ''
                : 'https://github.com/' +
                  res.data.company.replace(/[^A-Z0-9]/gi, '').toLowerCase();
    } else {
        noresults.style.display = 'block';
    }
};

const showData = () => {
    fetchUsers(inputValue.value).then((res) => {
        console.log(res);

        updateUsers(res);
    });
};

showDefaultData = () => {
    fetchUsers().then((res) => {
        updateUsers(res);
    });
};

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    showData();
});

window.onload = () => {
    showDefaultData();
};
