"use client";

import { FiX, FiCopy } from 'react-icons/fi';
import { useState } from 'react';
import {
  WhatsappIcon,
  LinkedinIcon,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
  PinterestIcon,
  TelegramIcon,
  WhatsappShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
  PinterestShareButton,
  TelegramShareButton,
  LinkedinShareButton,
} from "react-share";

interface ShareModalProps {
  open: boolean;
  onClose: () => void;
  shareUrl: string;
  title?: string;
}

export default function ShareModal({ open, onClose, shareUrl, title = 'Share' }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm relative animate-fadeIn">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-pink-500 text-2xl cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          <FiX />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-1">Share Link</label>
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="flex-1 bg-transparent outline-none text-gray-700 text-sm"
            />
            <button
              onClick={handleCopy}
              className="text-pink-500 hover:text-pink-700 p-1 cursor-pointer"
              aria-label="Copy link"
            >
              <FiCopy />
            </button>
          </div>
          {copied && <div className="text-green-600 text-xs mt-1">Copied!</div>}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-2">
          <WhatsappShareButton url={shareUrl} title={title} className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition">
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <LinkedinShareButton url={shareUrl} title={title} className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <FacebookShareButton url={shareUrl} title={title} className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <TwitterShareButton url={shareUrl} title={title} className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <EmailShareButton url={shareUrl} title={title} className="flex items-center justify-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 rounded-lg transition">
            <EmailIcon size={32} round />
          </EmailShareButton>
          <PinterestShareButton url={shareUrl}  media={shareUrl} title={title} className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition">
            <PinterestIcon size={32} round />
          </PinterestShareButton>
          <TelegramShareButton url={shareUrl} title={title} className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition">
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          </div>
          <button
            onClick={onClose}
            className="w-full mt-2 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 