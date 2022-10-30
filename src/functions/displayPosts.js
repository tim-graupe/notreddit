export function displayPosts(title, OP, votes, comments) {
    const posts = document.getElementById('test')
    // posts.textContent = "";
    const div = document.createElement('div');
    //title
    const header = document.createElement('h4');
    header.textContent = title;

    //submitted by
    const p = document.createElement('div');
    p.text = `Submitted by ${OP}`

    //updooots
    const doots = document.createElement('div');
    doots.textContent = votes;

    //reply count
    const replies = document.createElement('div');
    replies.textContent = comments

    posts.appendChild(div)
    header.appendChild(p)
    header.appendChild(doots)
    header.appendChild(replies)
    div.appendChild(header)
}