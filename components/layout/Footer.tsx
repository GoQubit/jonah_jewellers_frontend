import Image from "next/image";
import Link from "next/link";
import { BiPhone } from "react-icons/bi";
import { BsInstagram, BsMailbox, BsWhatsapp, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { IoMailOutline } from "react-icons/io5";

export default function Footer() {
  return (
    <div>
      <img src="/images/propsImgs/curve_vetor_footer.png" alt="" />
      <footer className="bg-black text-white py-6 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8 mb-8">
            {/* Logo and Brand Description */}
            <div className="lg:col-span-1">
              {/* Logo */}
              <Link href={"/"} className='flex self-start items-start ' >
                <Image src={"/images/logo2.png"} alt="logo" width={100} height={80} />
              </Link>
              <p className="text-gray-300 text-sm leading-relaxed">
                Jonah Jewels is a jewellery brand that deals in certified gold and diamond jewellery. Known for
                blending elegance with modern design, Jonah offers timeless pieces crafted with authenticity and
                precision.
              </p>
            </div>

            {/* Customer Service */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 md:mb-6">Customer Service</h3>
              <ul className="space-y-1 md:space-y-3">
                <li>
                  <Link href="/orders" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Where's My Order?
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Track your order
                  </Link>
                </li>
                {/* <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Fraud Warning Disclaimer
                  </a>
                </li> */}
                <li>
                  <Link href="/terms-and-conditions" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Terms of services
                  </Link>
                </li>
                <li>
                  <Link href="/privacy-policy" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Information */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 md:mb-6">Information</h3>
              <ul className="space-y-1 md:space-y-3">
                <li>
                  <Link href="/kitty-plan" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Kitty Information
                  </Link>
                </li>
                <li>
                  <Link href="/invest-in-gold" className="text-gray-300 hover:text-white transition-colors text-sm">
                    Investment Details
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Us */}
            <div className="lg:col-span-1">
              <h3 className="text-lg font-semibold mb-4 md:mb-6">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <BiPhone className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">Reach out to us Mon - Sat (10 AM - 7 PM)</p>
                    <a
                      href="tel:+919391008801"
                      className="text-lg font-medium text-brand hover:text-brandDark transition-colors"
                    >
                      +91 766 886 4212
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <BsWhatsapp className="w-5 h-5 mt-1 flex-shrink-0 " />
                  <div>
                    <p className="text-gray-300 text-sm">
                      Reach out to us Mon - Sat (10 AM - 7 PM)
                    </p>
                    <a
                      href="https://wa.me/917668864212?text=Hi%20there!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-brand hover:text-brandDark transition-colors"
                    >
                      +91 766 886 4212
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <IoMailOutline className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-sm">Email Us at</p>
                    <a
                      href="mailto:support@jonah.com"
                      className="text-lg font-medium text-brand hover:text-brandDark transition-colors"
                    >
                      support@jonahjewels.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Jonah Jewels . All Rights Reserved.</p>

            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <BsInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <BsYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
