import Link from "next/link";

export function ResetPasswordSuccessForm() {
  return (
    <div className="relative z-10 ml-[19vw] h-auto w-[21%] rounded-lg bg-white p-6 shadow-lg  2xl:left-[6%]">
      <h1 className="mb-4 text-center text-3xl font-bold text-[#0ea5e9]">
        PIPPAMS
      </h1>
      <h1 className="mb-12 text-center text-xl font-bold">Password Reset</h1>

      <div className="mb-20">
        <div className="mx-auto w-52 text-center font-sans text-2xl font-bold">
          You have successfully reset your password.
        </div>
      </div>
      <div className="mx-auto mb-[8vh] flex justify-center">
        <Link href="/">
          <button
            className="w-[80%] cursor-pointer rounded bg-[#0ea5e9] py-2 font-bold text-white hover:bg-blue-500 2xl:mb-14"
            type="button"
          >
            Back to login page
          </button>
        </Link>
      </div>
    </div>
  );
}