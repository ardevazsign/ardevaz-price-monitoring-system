import React from 'react';
import Title from './Title';
import { assets } from '../assets/assets';

const SpecialRice = () => {
  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Title text1={'SPECIAL RICE'} text2={'VARIETIES'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Here are some of the most common and widely considered “special rice”
          types based on their color and health benefits:
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 ">
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.red_rice}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="text-amber-400 text-center mb-1 ">Red Rice</p>
            <h6 className="text-gray-700">
              Color is Deep red to reddish-brown Varieties: Matta rice (India),
              Thai red rice, Philippine Pinawa Why Special because of Rich in
              antioxidants, especially anthocyanins in the bran. Taste: Earthy,
              nutty flavor Health Benefit: High in fiber, minerals (iron, zinc),
              and antioxidants.
            </h6>
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.brown_rice}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="text-amber-400 text-center mb-1 ">Brown Rice</p>
            <h6 className="text-gray-700">
              Color is Light brown or tan. Why Special it because Unmilled whole
              grain rice with bran intact. High in fiber and nutrients. Taste
              like Nutty, chewy Health Benefit is Good for heart, digestion, and
              blood sugar control.
            </h6>
            <hr className="mt-3 mb-2 text-gray-300" />
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.malagkit_senorita}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="text-amber-400 text-center mb-1 ">
              Glutinous Rice (Senorita)
            </p>
            <h6 className="text-gray-700">
              This type of rice becomes sticky when cooked due to its high
              amylopectin (a starch component) and low amylose content. Señorita
              is Locally known in the Philippines, aromatic, and soft. When it’s
              glutinous, it’s typically used in native delicacies like kakanin,
              suman, and biko.
            </h6>
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.sung_song}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="text-amber-400 text-center mb-1 ">
              Glutinous Rice (Sung-song)
            </p>
            <h6 className="text-gray-700">
              Texture is Very sticky when cooked, ideal for native delicacies.
              Short to Medium Grain: Typical of traditional malagkit varieties.
              Uses: Commonly used for suman, puto, biko, and other kakanin. It
              is originited in china it's common called Chinese Glutinous Rice
              sweet rice balls.
            </h6>
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.black_rice}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="text-amber-400 text-center mb-1 ">
              Black Rice (Forbidden Rice)
            </p>
            <h6 className="text-gray-700">
              Color is Deep purple to black (turns deep purple when cooked)
              Special because it is Once reserved for Chinese royalty, hence
              “forbidden rice.” Taste is like Slightly sweet, nutty Health
              Benefit is Very high in antioxidants (even more than blueberries),
              iron, and fiber.
            </h6>
          </div>
        </div>

        {/* guide */}
      </div>
    </div>
  );
};

export default SpecialRice;
