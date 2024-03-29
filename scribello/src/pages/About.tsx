import aboutImg from "../assets/images/bb-about.jpg";

export default function About() {
  return (
    <section>
      <div className="max-w-3xl mx-auto mt-4 my-6 py-6">
        <h2 className="text-2xl text-center lg:text-left lg:text-4xl font-text font-bold">
          About
        </h2>

        <div className="max-w-md mx-auto">
          <img src={aboutImg} alt="" />
        </div>
        <div className="mt-8">
          <h2 className="text-center lg:text-left text-3xl font-bold font-title">
            About BookBunny
          </h2>
          <p className="font-text text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam
            expedita dignissimos nulla est omnis voluptates magni quam, fugit
            veritatis aliquam amet quae minima a deleniti non ducimus autem
            nisi. Cupiditate.
          </p>
          <p className="font-text text-center lg:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
            voluptates nostrum cumque. Cupiditate ipsum illo sequi repellat
            eveniet quos distinctio a. Nulla ducimus animi tenetur optio a est
            explicabo veritatis?
          </p>
        </div>
      </div>
    </section>
  );
}
