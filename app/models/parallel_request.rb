class ParallelRequest
  require 'net/http'
  require "open-uri"
  def self.extract_download_item_ids

    response = URI.parse("https://glacial-sands-39825.herokuapp.com").read
    data = Hash.from_xml(response)
    data["downloads"]["item"]
  end
end