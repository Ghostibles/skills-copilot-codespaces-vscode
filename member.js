function skillsMember() {
    let skills = ['HTML', 'CSS', 'JS'];
    let member = {
        name: 'John',
        age: 20,
        skills: skills
    };
    console.log(member.skills);
    console.log(member.skills[1]);
    console.log(member.skills.length);
    console.log(member.skills[member.skills.length - 1]);
}