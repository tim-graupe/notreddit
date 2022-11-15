export function displayPosts(title, OP, votes, content) {
    const posts = document.getElementById('post')
    // posts.textContent = "";
    const div = document.createElement('div');
    div.textContent = content
    //title
    const header = document.createElement('h1');
    header.textContent = title;

    //submitted by
    const p = document.createElement('div');
    p.text = `Submitted by ${OP}`

    //updooots
    const doots = document.createElement('div');
    doots.textContent = votes;

    //reply count
    // const replies = document.createElement('div');
    // replies.textContent = comments

    posts.appendChild(header)
    posts.appendChild(div)
    posts.appendChild(p)
    posts.appendChild(doots)
    // header.appendChild(replies)
    // div.appendChild(header)
}