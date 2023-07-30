const CroppedImage = ({ src, alt, cropped, moreClass }) => {
    const otherClass = moreClass ? moreClass : '';
    const divClass = cropped ? 'mb-5' : '';
    const imageClass = cropped ? 'object-cover absolute h-full' : '';

    return (
        <div className={`directorImg grid-item relative overflow-hidden pt-[100%] ${divClass}`}>
            <img src={src} alt={alt} className={`top-0 left-0 w-full ${imageClass} ${otherClass}`} style={{ objectPosition: 'top' }} />
        </div>
    );
};

export default CroppedImage;