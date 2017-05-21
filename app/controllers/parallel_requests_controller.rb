class ParallelRequestsController < ActionController::Base
  require 'net/http'
  require "open-uri"
  def index
    @download_item_ids = ParallelRequest.extract_download_item_ids

    # Below Code works as well, but is slower than ajax calls

    # futures = download_item_ids.collect do |item_id|
    #   Concurrent::Future.execute do
    #     Rails.application.executor.wrap do
    #       response = URI.parse("https://glacial-sands-39825.herokuapp.com/downloads/#{item_id}").read
    #       parsed_value = Hash.from_xml(response)["download"]["item"]
    #       parsed_value
    #     end
    #   end
    # end
    # ActiveSupport::Dependencies.interlock.permit_concurrent_loads do
    #   @results = futures.collect(&:value)
    # end
  end

end
