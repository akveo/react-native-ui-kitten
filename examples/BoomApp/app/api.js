function getUserInfo(id) {
  return users.find((u) => u.id === id);
}

function getUserFriends(id) {
  return users.filter((u) => u.id !== id);
}

function getUserPosts(id) {
  return posts.filter((p) => p.userId == id);
}

function getUserFeed(id) {
  return posts.filter((p) => p.userId !== id)
    .map((p) => {
      let user = getUserInfo(p.userId);
      p.userName = user.name.first + ' ' +user.name.last;
      p.userAvatar = user.avatar;
      return p;
    });
}

function likePost(post){
    post = posts.find((p) => p.id === post.id);
    post.likes++;
    post.liked = true;
}

let userId = '1';

let users = [
  {
    "id": "1",
    "age": 23,
    "name": {
      "first": "Fletcher",
      "last": "Saunders"
    },
    "email": "fletcher.saunders@mail.tv",
    "phone": "+1 (898) 460-3581",
    "address": "140 Riverdale Avenue, Allendale, Maine, 1825",
    "registered": "Saturday, June 14, 2014 8:33 PM",
    "avatar": require("../img/avatars/boy.jpeg"),
    "profileBg": require("../img/bg/lights2.jpeg")
  },
  {
    "id": "2",
    "age": 21,
    "name": {
      "first": "Tran",
      "last": "Keith"
    },
    "email": "tran.keith@mail.net",
    "phone": "+1 (911) 404-2873",
    "address": "492 Applegate Court, Westboro, Marshall Islands, 7942",
    "registered": "Sunday, October 4, 2015 8:40 PM",
    "avatar": require("../img/avatars/boy2.jpg"),
    "profileBg": require("../img/bg/profileBg.jpg")
  },
  {
    "id": "3",
    "age": 37,
    "name": {
      "first": "Ramos",
      "last": "Rowe"
    },
    "email": "ramos.rowe@mail.co.uk",
    "phone": "+1 (935) 577-3141",
    "address": "228 Cheever Place, Ladera, Idaho, 459",
    "registered": "Friday, April 24, 2015 9:38 PM",
    "avatar": require("../img/avatars/boy3.jpg"),
    "profileBg": require("../img/bg/profileBg.jpg")
  },
  {
    "id": "4",
    "age": 34,
    "name": {
      "first": "Sellers",
      "last": "Delgado"
    },
    "email": "sellers.delgado@mail.me",
    "phone": "+1 (910) 494-2110",
    "address": "863 Chester Avenue, Shrewsbury, Utah, 8537",
    "registered": "Wednesday, May 21, 2014 10:13 PM",
    "avatar": require("../img/avatars/boy4.jpg"),
    "profileBg": require("../img/bg/profileBg.jpg")
  },
  {
    "id": "5",
    "age": 25,
    "name": {
      "first": "Eliza",
      "last": "Dotson"
    },
    "email": "eliza.dotson@mail.org",
    "phone": "+1 (928) 463-3103",
    "address": "155 Bethel Loop, Santel, Arizona, 3114",
    "registered": "Wednesday, September 2, 2015 2:04 AM",
    "avatar": require("../img/avatars/girl.jpeg"),
    "profileBg": require("../img/bg/profileBg.jpg")
  },

];

let posts = [
  {
    id: "1",
    userId: "1",
    img: require("../img/postPhotos/animal.jpeg"),
    likes: 4
  },
  {
    id: "2",
    userId: "1",
    img: require("../img/postPhotos/bird.jpeg"),
    likes: 5
  },
  {
    id: "3",
    userId: "1",
    img: require("../img/postPhotos/clock.jpg"),
    likes: 6
  },
  {
    id: "4",
    userId: "1",
    img: require("../img/postPhotos/fireworks.jpeg"),
    likes: 3
  },
  {
    id: "5",
    userId: "1",
    img: require("../img/postPhotos/flowers.jpeg"),
    likes: 4
  },
  {
    id: "6",
    userId: "2",
    img: require("../img/postPhotos/night.jpeg"),
    likes: 11
  },
  {
    id: "7",
    userId: "3",
    img: require("../img/postPhotos/river.jpeg"),
    likes: 2
  },
  {
    id: "8",
    userId: "4",
    img: require("../img/postPhotos/sea.jpg"),
    likes: 44
  },
  {
    id: "9",
    userId: "5",
    img: require("../img/postPhotos/sun.jpg"),
    likes: 1
  },
  {
    id: "10",
    userId: "5",
    img: require("../img/postPhotos/tree.jpeg"),
    likes: 8
  },
  {
    id: "11",
    userId: "5",
    img: require("../img/postPhotos/wood.jpeg"),
    likes: 7
  }
];

let comments = [
  {
    id: "",
    postId: "",
    userId: "",
    text: ""
  }
];

export default {
  getUsers: () => users,
  getPosts: () => posts,
  getUserInfo,
  getUserFriends,
  getUserPosts,
  getUserFeed,
  likePost,
  userId,
}
