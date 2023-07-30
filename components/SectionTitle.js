import '../app/film.scss'

export default function SectionTitle(props) {
  const { content } = props

  return (
    <div className="mt-[6rem] mb-[1rem]">
      <h2 className="font-special text-primary text-h2 font-semibold">{content}</h2>
    </div>
  );
};
