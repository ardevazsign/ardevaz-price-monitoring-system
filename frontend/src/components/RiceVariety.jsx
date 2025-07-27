import React from 'react';
import Title from './Title';
import { assets } from '../assets/assets';

const RiceVariety = () => {
  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={'RICE'} text2={'VARIETIES'} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600">
          Rice varieties can be categorized based on several factors, including
          grain length, texture, aroma, and color. Here are the main types:
        </p>
      </div>
      {/* Rendering Varieties  */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.variety100}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="mt-2 mb-2 text-center text-amber-400">
              Long-Grain Rice
            </p>
            <p className="text-cyan-400">
              Example :{' '}
              <h6 className="text-gray-700">
                Basmati, Jasmine, American Long-Grain
              </h6>{' '}
            </p>
            <p className="text-cyan-400">
              Characteristics :{' '}
              <h6 className="text-gray-700">
                Stays separate and fluffy after cooking.
              </h6>
            </p>
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.medium_grain}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="mt-2 mb-2 text-center text-amber-400">
              Medium-Grain Rice
            </p>
            <p className="text-cyan-400">
              Example : <h6 className="text-gray-700">Arborio, Calrose</h6>
            </p>
            <p className="text-cyan-400">
              Characteristics :{' '}
              <h6 className="text-gray-700">
                Slightly sticky, tender, & moist.
              </h6>
            </p>
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.short_grain_2}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="mt-2 mb-2 text-center text-amber-400">
              Short-Grain Rice
            </p>
            <p className="text-cyan-400">
              Example :{' '}
              <h6 className="text-gray-700">
                {' '}
                Sushi rice, Glutinous (Sticky) rice
              </h6>
            </p>
            <p className="text-cyan-400">
              Characteristics:{' '}
              <h6 className="text-gray-700">
                Very sticky and clumps together.
              </h6>
            </p>
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.variety510}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="mt-0 mb-2 text-center text-amber-400">
              Variety Of Rice
            </p>
            <p className="text-amber-400 text-center">
              Variety<span className="text-cyan-400"> : Origin </span>
              <span className="text-gray-700"> : Characteristics</span>
            </p>
            <hr className="text-gray-300" />
            <p className="text-amber-400">
              Basmati<span className="text-cyan-400"> : India/Pakistan</span>
              <span className="text-gray-700">
                : Aromatic, long-grain, fluffy
              </span>
            </p>
            <hr className="text-gray-300" />
            <p className="text-amber-400">
              Jasmine<span className="text-cyan-400"> : Thailand</span>
              <span className="text-gray-700">: slightly sticky</span>
            </p>
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.variety511}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="text-amber-400 text-center">
              Variety<span className="text-cyan-400"> : Origin </span>
              <span className="text-gray-700"> : Characteristics</span>
            </p>
            <hr className="text-gray-300 mb-1.5" />
            <p className="text-amber-400 text-center">
              Arborio<span className="text-cyan-400"> :Italy </span>
              <span className="text-gray-700">: Creamy when cooked</span>
            </p>
            <hr className="text-gray-300" />
            <p className="text-amber-400 text-center">
              Glutinous
              <span className="text-cyan-400"> : Southeast Asia </span>
              <span className="text-gray-700">
                : Used in sticky rice dishes
              </span>
            </p>
            <hr className="text-gray-300" />
            <p className="text-amber-400 text-center">
              Sushi
              <span className="text-cyan-400"> : Japan </span>
              <span className="text-gray-700">: Short-grain, sticky</span>
            </p>
            <hr className="text-gray-300" />
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.variety20}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="text-amber-400 text-center mb-1 ">
              Variety<span className="text-cyan-400"> : Origin </span>
              <span className="text-gray-700"> : Characteristics</span>
            </p>
            <hr className="text-gray-300 mb-1.5" />
            <p className="text-amber-400 text-center">
              Red Rice
              <h6 className="text-cyan-400"> : Bhutan, Thailand </h6>
              <h6 className="text-gray-700">: Whole grain, nutty</h6>
            </p>
            <hr className="text-gray-300" />
            <p className="text-amber-400 text-center">
              Black Rice
              <h6 className="text-cyan-400"> : China, Southeast Asia </h6>
              <h6 className="text-gray-700">
                : Rich in antioxidants (also called "forbidden rice")
              </h6>
            </p>
            <hr className="text-gray-300" />
            <p className="text-amber-400 text-center">
              Wild Rice
              <h6 className="text-cyan-400"> : North America </h6>
              <h6 className="text-gray-700">
                : Technically a grass; chewy and nutty
              </h6>
            </p>
            <hr className="text-gray-300" />
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.image1500}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="mt-0 mb-0.5 text-center text-amber-400">
              Philippines
            </p>
            <h5 className="text-cyan-400">Rice Categories :</h5>
            <hr className="text-gray-300 mb-2 mt-2" />
            <p className="text-amber-400 text-center">
              Dinurado
              <h6 className="text-gray-700">
                Long-grain, white, mildly aromatic, soft & slightly sticky when
                cooked.
              </h6>
            </p>
            <hr className="text-gray-300 mb-2 mt-2" />
            <p className="text-amber-400 text-center">
              Sinandomeng
              <h6 className="text-gray-700">
                Non-aromatic or very mild, Soft and fluffy when cooked, less
                sticky. Medium to long grain, white color.
              </h6>
            </p>
            <hr className="text-gray-300 mb-2 mt-2" />
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.image1000}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="mt-2 mb-2 text-center text-amber-400">Philippines</p>
            <h5 className="text-cyan-400 mb-2 mt-2">Rice Categories :</h5>
            <hr className="text-gray-300 mb-2 mt-2" />

            <p className="text-amber-400 text-center mb-2 mt-2">
              Malagkit
              <h6 className="text-gray-700">
                Aroma is Mild or neutral. Very sticky and chewy when cooked.
                Short and round. Color is Comes in white or black/purple
                varieties. Best For Kakanin (Filipino rice delicacies), suman,
                biko, champorado, etc. Note: Despite being called “glutinous,”
                it contains no gluten.
              </h6>
            </p>
            <hr className="text-gray-300 mb-2 mt-3" />
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.jasmine0012}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="mt-0 mb-0 text-center text-amber-400">Jasmine Rice</p>
            <h5 className="text-cyan-400">Rice Categories :</h5>
            <hr className="text-gray-300 mb-1" />
            <p className="text-amber-400 text-center">
              Jasmine from Thailand
              <h6 className="text-gray-700">
                Highly aromatic, with a pandan-like scent. Texture is Soft,
                moist, and slightly sticky when freshly cooked. Grain Type is
                Long-grain. Color is White (or sometimes golden when uncooked).
                Best For Asian dishes, especially Thai or Vietnamese cuisine.
                Notes: Also known as "Hom Mali" rice from Thailand. Premium
                export-quality rice.
              </h6>
            </p>
            <hr className="text-gray-300 mt-2" />
          </div>
        </div>
        <div>
          <img
            className="border-white border-4  w-75 h-75 transition-transform ease-in-out duration-700 hover:scale-120 hover:shadow-2xl hover:rounded-full "
            src={assets.brown_rice}
            alt=""
          />
          <div className="bg-amber-50 p-4 shadow-2xl">
            <p className="mt-0 mb-0 text-center text-amber-400">Brown Rice</p>

            <hr className="text-gray-300" />
            <h6 className="text-amber-400 text-center">
              Origin : India, China, & Southeast Asia.
              <h6 className="text-gray-700">
                Brown rice color Light brown or tan Texture is Chewy, slightly
                firm even after cooking have Nutty, earthy taste. Nutrition is
                High in fiber, vitamins (especially B vitamins), minerals
                (magnesium, phosphorus), and antioxidants. Cooking Time is
                Longer than white rice (usually 40–50 minutes) Shelf Life
                Shorter than white rice due to the natural oils in the bran,
                which can turn rancid. Glycemic Index Lower than white rice,
                better for blood sugar control
              </h6>
            </h6>
            <hr className="text-gray-300" />
          </div>
        </div>
        {/* guide */}
      </div>
    </div>
  );
};

export default RiceVariety;
