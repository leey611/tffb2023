const CroppedImage = ({ src, alt, cropped, moreClass }) => {
    const otherClass = moreClass ? moreClass : '';
    const divClass = cropped ? 'mb-5 lg:pt-[100%] lg:w-auto lg:h-auto w-[10rem] h-[10rem]' : '';
    const imageClass = cropped ? 'object-cover absolute h-full' : '';

    return (
        <div className={`directorImg lg:grid-item relative overflow-hidden ${divClass}`}>
            <img src={src} alt={alt} className={`top-0 left-0 w-full ${imageClass} ${otherClass}`} style={{ objectPosition: 'top' }} />
        </div>
    );
};

export default CroppedImage;