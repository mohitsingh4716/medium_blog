import secure from "../assets/secure.jpg"

export const Quote = () => {
  return (
    <div className="bg-slate-200 h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="max-w-lg ">
          <div className=" text-3xl font-bold">
            "The customer support I received was exceptional. The support team
            went above and beyond to address by concern"
          </div>
          <div className="max-w-md text-xl font-semibold text-left pt-4">
            Shivam Kumar
          </div>
          <div className="max-w-md text-sm  text-slate-400">
            CEO | Acme Inc
          </div>

        </div>

      </div>
      <div className="max-w-lg"></div>
    </div>
  );
};



export const Quota=()=>{
  return (
    <div className="bg-slate- h-screen justify-center flex-col border-bla border-l">
     
      <div className=" pt-16 flex justify-center ">
            <div className="max-w-2xl">
              <img src={secure} alt="Secure" />
              
            </div>

      </div>

      <div className="max-w-lg"></div>

    </div>
  );
}
