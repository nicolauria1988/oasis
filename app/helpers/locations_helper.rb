module LocationsHelper
  def create_calendar
    calendar = []
    now = Date.today
    start_of_month = Date.new(now.year, now.month, 1)
    end_of_month = Date.new(now.year, now.month, -1)

    12.times do
      month = {}

      while start_of_month <= end_of_month
        start_sym = start_of_month.strftime("%m-%d-%Y").to_sym
        month[start_sym] = true
        start_of_month += 1
      end
      
      calendar << month
      end_of_month = Date.new(start_of_month.year, start_of_month.month, -1)
    end

    return calendar
  end
end