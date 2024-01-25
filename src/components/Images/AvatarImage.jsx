const AvatarImage = ({ imageUrl, alt }) => (
  <div className='w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-biscay-600'>
    <img src={imageUrl} alt={alt} />
  </div>
)

export default AvatarImage
