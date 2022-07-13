export const ProfileImage = ({ name }) => {
    return (
        <img src={`https://ui-avatars.com/api/?background=fd4e5d&color=fff&name=${name}`} className="rounded-full w-10 h-10" />
    );
}