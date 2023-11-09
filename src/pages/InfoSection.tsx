import { SeoToggle } from "../components/Common/Buttons/SeoToggle";

export const InfoSection = ({ onButtonClick, isSeoVisible }: { onButtonClick; isSeoVisible }) => {
  return (
    <div>
      {isSeoVisible && (
        <div className="absolute w-full bg-gray-800/[0.90] text-slate-200">
          <div className="ml-20 mr-20">
            <h1 className="pt-20 text-4xl font-bold">
              {" "}
              What is <span className="text-purple-500">Astrostation?</span>
            </h1>
            <p className="pt-5 text-lg">
              Astrostation is a versatile desktop and mobile app designed to enhance time management and productivity.
              It is centered around a popular concentration improvement strategy, developed by{" "}
              <span className="font-bold italic">
                <a href="https://francescocirillo.com/products/the-pomodoro-technique" target="_blank">
                  Francesco Cirillo,{" "}
                </a>
              </span>
              known as the "Pomodoro Technique."{" "}
            </p>
            <p className="pt-5 text-lg">
              {" "}
              What makes Astrostation unique is your ability to personalize it with a wide array of aesthetic widgets
              and customizable settings! A staple for studying or tackling projects!
            </p>

            <h2 className="pt-5 text-3xl font-bold"> How to use our Pomodoro Timer </h2>
            <ul className="list-decimal pt-5 pl-10 text-lg">
              <li>Click "Add Task" in your "Task Tracker" widget</li>
              <li>Type in the task you need to complete</li>
              <li>
                Set the "Pomodoro Count" for how long you would like to focus on it at a time (1 pomodoro = 25 minutes)
              </li>
              <li>Press "Save" then click "Start" on the timer widget</li>
            </ul>
            <p className="pt-5 text-lg">
              Work uninterrupted until the timer goes off, then take a short break before starting the next session!
              Repeat this cycle until your task is complete.
            </p>

            <h2 className="pt-5 text-3xl font-bold"> Benefits of an Online Pomodoro Timer? </h2>
            <p className="pt-5 text-lg">
              An online Pomodoro timer like Astrostation can help you manage your time more effectively by breaking your
              work into focused sessions. This technique typically involves working for 25-minute intervals, followed by
              short breaks.
            </p>
            <p className="pt-5 text-lg">
              According to{" "}
              <span className="font-bold italic">
                <a
                  href="https://www.lifehack.org/articles/productivity/the-pomodoro-technique-is-it-right-for-you.html"
                  target="_blank"
                >
                  LifeHack.org
                </a>
              </span>
              , this method allows you to:
            </p>
            <ul className="list-disc pt-5 pl-10 text-lg">
              <li>Set time for distractions</li>
              <li>Limit open-ended work</li>
              <li>Turn your work into a game</li>
              <li>Move away from procrastination</li>
            </ul>

            <h2 className="pt-5 text-3xl font-bold">Extremely Customizable</h2>

            <ul className="list-none pt-5 pl-5 text-lg">
              <li>
                <span className="font-bold">Time settings:</span> Change the default time set for a short break, long
                break, and Pomodoro.
              </li>
              <li>
                <span className="font-bold">Sound settings:</span> Adjust the alarm volume and sound, with options that
                include retro bells, flute, and piano.
              </li>
              <li>
                <span className="font-bold"> Dashboard settings:</span> Determine the grid size and lock widgets in
                place. With all these customization options, our Pomodoro app is the perfect tool for anyone looking to
                increase their productivity and stay on track.
              </li>
            </ul>
            <h2 className="pt-5 text-3xl font-bold">
              The ✨ Aesthetic ✨ Widgets of <span className="text-purple-500">Astrostation</span>
            </h2>

            <ul className="list-disc pt-5 pl-10 text-lg">
              <li>Choose between various aesthetically pleasing backgrounds!</li>
              <li>Tune into our Lofi Wifi Station with 4 different channels!</li>
              <li>Listen to your go-to Spotify playlist with our Spotify widget</li>
              <li>Use the Twitch widget to support your favorite streamer while you study!</li>
              <li>Watch some videos with our YouTube widget!</li>
              <li>Use our quote widget to display inspirational quotes</li>
              <li>Need to remember something? There’s a sticky note widget for that!</li>
            </ul>

            <h2 className="pt-5 text-3xl font-bold">Other ways to stay focused while studying </h2>
            <p className="pt-5 text-lg">
              In addition to using a Pomodoro timer like Astrostation, there are other strategies you can try out to
              stay focused while studying!
            </p>

            <ul className="list-disc pt-5 pl-10 text-lg">
              <li>Prepare yourself your favorite snack to enjoy while studying</li>
              <li>Break your work into smaller, manageable tasks, and prioritize them based on importance</li>
              <li>Eliminate distractions, such as turning off your phone or blocking distracting websites</li>
              <li>Make sure you’re getting enough sleep</li>
              <li>Make sure you’re drinking at least 12-16 cups of water a day</li>
            </ul>

            <h2 className="pt-5 text-3xl font-bold"> Contribute to the app </h2>
            <p className="pt-5 text-lg">
              Did you know Astrostation is now open source? That means our source code is public and any developer can
              submit new features.
            </p>
            <p className="pt-5 text-lg">
              {" "}
              Check out the Github repository{" "}
              <span className="font-bold text-purple-500">
                <a href="https://github.com/melkeyoss/astrostation" target="_blank">
                  here!
                </a>
              </span>
            </p>
            <div className="flex justify-center">
              <SeoToggle onClick={onButtonClick} />
            </div>
          </div>
          <footer className="lg:text-lef bottom-0 bg-gray-900/[0.7] text-center text-sm">
            <ul className="pt-2 text-center text-purple-500/[0.75] ">
              <li>
                <a className="text-purple-500/[0.75] " href="https://www.upcounsel.com/privacy-policy-template">
                  Privacy Policy
                </a>
                <a className="text-purple-500/[0.75] " href="https://opensource.org/license/mit/">
                  {" - "}License
                </a>
                <a className="text-purple-500/[0.75] " href="https://github.com/melkeyoss/astrostation">
                  {" - "}Github
                </a>
              </li>
            </ul>
            <div className="pb-2 text-center text-neutral-500 ">
              © 2023 Copyright:{" "}
              <a className="text-neutral-500" href="https://twitter.com/melkeydev">
                Astrostation
              </a>
            </div>
          </footer>
        </div>
      )}
      ;
    </div>
  );
};
