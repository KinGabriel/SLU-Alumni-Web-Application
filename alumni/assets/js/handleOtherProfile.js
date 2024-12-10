function toggleFollow() {
    const followIcon = document.getElementById("follow-icon");
    const followText = document.getElementById("follow-text");

    if (followText.textContent.trim() === "Follow") {
        followIcon.src = "../assets/images/unfollow.png"; 
        followIcon.alt = "Unfollow Icon";
        followText.textContent = "Unfollow";
    } else {
        followIcon.src = "../assets/images/follow.png"; 
        followIcon.alt = "Follow Icon";
        followText.textContent = "Follow";
    }
}